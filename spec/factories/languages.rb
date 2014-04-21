FactoryGirl.define do
  factory :language do
    name "French"
    language_code "fr"
  end

  factory :word do
    sequence(:word) { |n| "boulangerie#{n}" }
    language_id 1
    translation "bakery"
  end
end