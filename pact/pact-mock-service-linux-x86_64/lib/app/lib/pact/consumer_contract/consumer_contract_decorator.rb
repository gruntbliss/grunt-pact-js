require 'pact/shared/active_support_support'
require 'pact/consumer_contract/interaction_decorator'

module Pact
  class ConsumerContractDecorator

    include ActiveSupportSupport

    def initialize consumer_contract
      @consumer_contract = consumer_contract
    end

    def as_json(options = {})
      fix_all_the_things(
        consumer: consumer_contract.consumer.as_json,
        provider: consumer_contract.provider.as_json,
        interactions: consumer_contract.interactions.collect{ |i| InteractionDecorator.new(i).as_json},
        metadata: {
          pactSpecificationVersion: "1.0.0"
        }
      )
    end

    def to_json(options = {})
      as_json.to_json(options)
    end

    private

    attr_reader :consumer_contract

  end
end
