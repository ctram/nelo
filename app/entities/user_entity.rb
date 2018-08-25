module API
  module Entities
    class UserEntity < Grape::Entity
      expose :id
      expose :email
      expose :role
    end
  end
end