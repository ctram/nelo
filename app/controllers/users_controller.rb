require_relative '../entities/user_entity'
require_relative '../helpers/pagination_helper'

class UsersController < ApplicationController
  skip_before_action :redirect_if_not_logged_in, except: [:index, :show]

  def index
    page = params[:page]
    users = User.where.not('role = ?', 'admin')
    pagination_details = PaginationHelper.pagination_details(users, page)
    @user = pagination_details.delete(:paginated_query)
    @pagination_details = pagination_details
    @users = UserEntity.represent(@users).as_json
  end

  def show
    @user = User.find(params[:id])
    @user = UserEntity.represent(@user).as_json
  end

  def edit
    @user = User.find(params[:id])
    can? :edit, @user
    @user = UserEntity.represent(@user).as_json
  end
  
  def update
    @user = User.find(params[:id])
    can? :update, @user
    @user.update(user_params)
    @user = UserEntity.represent(@user).as_json
    render :show
  end

  def destroy
    user = User.find(params[:id])
    can? :destroy, user
    user.destroy
  end
  
  private

  def user_params
    params.require(:user).permit(:email)
  end
  
end
