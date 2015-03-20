require 'pact/matchers'
require 'pact/symbolize_keys'
require 'pact/consumer_contract/headers'
require 'pact/consumer_contract/query'

module Pact

  module Request

    class Base
      include Pact::Matchers
      include Pact::SymbolizeKeys
      extend Pact::Matchers

      attr_reader :method, :path, :headers, :body, :query, :options

      def initialize(method, path, headers, body, query)
        @method = method.to_s
        @path = path.chomp('/')
        @headers = Hash === headers ? Headers.new(headers) : headers # Could be a NullExpectation - TODO make this more elegant
        @body = body
        @query = is_unspecified?(query) ? query : Pact::Query.create(query)
      end

      def to_hash
        hash = {
          method: method,
          path: path,
        }

        hash.merge!(query: query) if specified?(:query)
        hash.merge!(headers: headers) if specified?(:headers)
        hash.merge!(body: body) if specified?(:body)
        hash
      end

      def method_and_path
        "#{method.upcase} #{full_path}"
      end

      def full_path
        display_path + display_query
      end

      def content_type
        return nil unless specified?(:headers)
        headers['Content-Type']
      end

      def content_type? content_type
        self.content_type == content_type
      end

      def modifies_resource?
        http_method_modifies_resource? && body_specified?
      end

      def specified? key
        !is_unspecified?(self.send(key))
      end

      protected

      # Not including DELETE, as we don't care about the resources updated state.
      def http_method_modifies_resource?
        ['PUT','POST','PATCH'].include?(method.to_s.upcase)
      end

      def self.key_not_found
        raise NotImplementedError
      end

      def body_specified?
        specified?(:body)
      end

      def is_unspecified? value
        value.is_a? self.class.key_not_found.class
      end

      def to_hash_without_body_or_query
        keep_keys = [:method, :path, :headers]
        to_hash.reject{ |key, value| !keep_keys.include? key }.tap do | hash |
          hash[:method] = method.upcase
        end
      end

      def display_path
        path.empty? ? "/" : path
      end

      def display_query
        (query.nil? || query.empty?) ? '' : "?#{Pact::Reification.from_term(query)}"
      end

    end
  end
end