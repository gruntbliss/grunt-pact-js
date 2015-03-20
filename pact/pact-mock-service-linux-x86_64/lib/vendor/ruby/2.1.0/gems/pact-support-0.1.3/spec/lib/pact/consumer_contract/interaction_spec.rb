require 'spec_helper'
require 'pact/reification'
require 'pact/consumer_contract/interaction'

module Pact
  module Consumer

    describe Interaction do

      let(:request) { {method: 'get', path: 'path'} }
      let(:response) { {} }

      describe "==" do
        subject { InteractionFactory.create }
        context "when other is the same" do
          let(:other) { InteractionFactory.create }
          it "returns true" do
            expect(subject == other).to be true
          end
        end
        context "when other is not the same" do
          let(:other) { InteractionFactory.create(:request => {:path => '/a_different_path'}) }
          it "returns false" do
            expect(subject == other).to be false
          end
        end
      end

      describe "matches_criteria?" do
        subject { InteractionFactory.create(:description => 'a request for food') }
        context "by description" do
          context "when the interaction matches" do
            it "returns true" do
              expect(subject.matches_criteria?(:description => /request.*food/)).to be true
            end
          end
          context "when the interaction does not match" do
            it "returns false" do
              expect(subject.matches_criteria?(:description => /blah/)).to be false
            end
          end
        end
      end

      describe "from_hash" do
        context "when providerState has been used instead of provider_state" do

          subject { Interaction.from_hash('response' => response, 'request' => request, 'providerState' => 'some state') }

          it "recognises the provider state" do
            expect(subject.provider_state).to eq 'some state'
          end
        end
      end

      describe "request_modifies_resource_without_checking_response_body?" do

        let(:interaction) { Interaction.new(request: request, response: response)}

        subject { interaction.request_modifies_resource_without_checking_response_body?}

        context "when the request modifies the resource and the response allows any value in body" do
          let(:request) { instance_double(Pact::Request::Expected, modifies_resource?: true) }
          let(:response) { instance_double(Pact::Response, body_allows_any_value?: true) }

          it "returns true" do
            expect(subject).to be true
          end
        end

        context "when the request modifies the resource and the response does not allow any value in body" do
          let(:request) { instance_double(Pact::Request::Expected, modifies_resource?: true) }
          let(:response) { instance_double(Pact::Response, body_allows_any_value?: false) }

          it "returns false" do
            expect(subject).to be false
          end
        end

        context "when the request does not modifies the resource and the response does not allow any value in body" do
          let(:request) { instance_double(Pact::Request::Expected, modifies_resource?: false) }
          let(:response) { instance_double(Pact::Response, body_allows_any_value?: false) }

          it "returns false" do
            expect(subject).to be false
          end
        end

        context "when the request does not modifies the resource and the response allows any value in body" do
          let(:request) { instance_double(Pact::Request::Expected, modifies_resource?: false) }
          let(:response) { instance_double(Pact::Response, body_allows_any_value?: true) }

          it "returns false" do
            expect(subject).to be false
          end
        end

      end
    end
  end
end
