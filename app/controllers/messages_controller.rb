class MessagesController < ApplicationController
  skip_before_action :redirect_if_not_logged_in, except: [:index, :show]
  
  def index
    user = User.find(params[:user_id])

    if current_user == user
      @messages = current_user.messages.reverse_order
    elsif signed_in?
      @messages = user.viewable_messages_for(current_user).reverse_order
    else
      @messages = user.messages.privacy_public.reverse_order
    end
    
    @messages = API::Entities::MessageEntity.represent(@messages).as_json
  end

  def new
    @message = Message.new
  end
  
  def create
    @message = Message.new(message_params)
    can? :create, @message
    @message.save
    # redirect to origin url
    redirect_to entries_path
  end

  def update
    @message = Message.find(params[:id])
    can? :update, @message
    @message.update(message_params)
  end

  def show
    @message = Message.find(params[:id])
    can? :read, @message
  end

  def destroy
    @message = Message.find(params[:id])
    can? :destroy, @message
    @message.destroy
    # TODO: redirect to origin url
    redirect_to 'entries#index'
  end

  private 

  def message_params
    params.require(:message).permit(:content, :privacy_level, :author_id, :recipient_id)
  end
end