require 'thwait'

require 'net/http'
require 'uri'
require 'find_a_port'
require 'pact/logging'
require 'pact/consumer/server'
require 'singleton'
require 'pact/consumer/mock_service/app'

module Pact
  module Consumer
    class AppManager

      include Pact::Logging

      include Singleton

      def initialize
        @apps_spawned = false
        @app_registrations = []
      end

      def register_mock_service_for name, url
        uri = URI(url)
        raise "Currently only http is supported" unless uri.scheme == 'http'
        raise "Currently only services on localhost are supported" unless uri.host == 'localhost'

        register(MockService.new(log_file: create_log_file(name), name: name, pact_dir: pact_dir), uri.port)
      end

      def register(app, port = FindAPort.available_port)
        existing = existing_app_on_port port
        raise "Port #{port} is already being used by #{existing}" if existing and not existing == app
        app_registration = register_app app, port
        app_registration.spawn if @apps_spawned
        port
      end

      def existing_app_on_port port
        app_registration = @app_registrations.find { |app_registration| app_registration.port == port }
        app_registration ? app_registration.app : nil
      end

      def app_registered_on?(port)
        app_registrations.any? { |app_registration| app_registration.port == port }
      end

      def ports_of_mock_services
        app_registrations.find_all(&:is_a_mock_service?).collect(&:port)
      end

      def kill_all
        app_registrations.find_all(&:spawned?).collect(&:kill)
        @apps_spawned = false
      end

      def clear_all
        kill_all
        @app_registrations = []
      end

      def spawn_all
        app_registrations.find_all(&:not_spawned?).collect(&:spawn)
        @apps_spawned = true
      end

      private

      def pact_dir
        Pact.configuration.pact_dir
      end

      def create_log_file service_name
        FileUtils::mkdir_p Pact.configuration.log_dir
        log = File.open(log_file_path(service_name), 'w')
        log.sync = true
        log
      end

      def log_file_path service_name
        File.join(Pact.configuration.log_dir, "#{log_file_name(service_name)}.log")
      end

      def log_file_name service_name
        lower_case_name = service_name.downcase.gsub(/\s+/, '_')
        if lower_case_name.include?('_service')
          lower_case_name.gsub('_service', '_mock_service')
        else
          lower_case_name + '_mock_service'
        end
      end

      def app_registrations
        @app_registrations
      end

      def register_app app, port
        app_registration = AppRegistration.new :app => app, :port => port
        app_registrations << app_registration
        app_registration
      end
    end

    class AppRegistration
      include Pact::Logging
      attr_accessor :port
      attr_accessor :app
      attr_accessor :pid

      def initialize opts
        @max_wait = 10
        @port = opts[:port]
        @pid = opts[:pid]
        @app = opts[:app]
      end

      def kill
        # TODO: need to work out how to kill
        # logger.info "Killing #{self}"
        # Process.kill(9, pid)
        # Process.wait(pid)
        # self.pid = nil
        self.pid = nil
      end

      def not_spawned?
        !spawned?
      end

      def spawned?
        self.pid != nil
      end

      def is_a_mock_service?
        app.is_a? MockService
      end

      def to_s
        "#{app} on port #{port}" + (@pid ? " with pid #{pid}" : "")
      end

      def spawn
        logger.info "Starting app #{self}..."
        Pact::Server.new(app, port).boot
        self.pid = 'unknown'
        logger.info "Started with pid #{pid}"
      end

      def wait_until
        waited = 0
        wait_time = 0.1
        while waited < @max_wait do
          break if yield
          sleep wait_time
          waited += wait_time
          raise "Waited longer than #{@max_wait} seconds" if waited >= @max_wait
        end
      end

    end
  end
end
