module API
  module Entities
    class UserEntity < Grape::Entity
      expose :id
      expose :email
      expose :role
      expose :profile_image_url
      expose :about
      expose :spirit_animal
      expose :username
    end
  end
end