class MessagesController < ApplicationController
  def index
    user = User.find(params[:user_id])
    render json: API::Entities::MessageEntity.represent(user.public_messages)
  end

  def new
    @message = Message.new
  end
  
  def create
    raise 'Author can only be the current user' if message_params[:author_id] != current_user.id
    @message = Message.create(message_params)
    redirect_to entries_path
  end

  def update
    @message = Message.find(params[:id])
    @message.update(message_params)
  end

  def show
    @message = Message.find(params[:id])
  end

  def destroy
    @message = Message.find(params[:id])
    @message.destroy
    # TODO: redirect to origin url
    redirect_to 'entries#index'
  end

  private 

  def message_params
    params.require(:message).permit(:content, :privacy_level, :author_id, :recipient_id)
  end
end