class MessagesController < ApplicationController
  def index
    type = params[:type]

    case type
    when 'recipient'
      @messages = current_user.messages_as_recipient
    when 'author'
      @messages = current_user.messages_as_author
    else
      @messages = []
    end

    render json: @messages
  end

  def new
    @message = Message.new
  end
  
  def create
    @message = Message.create(message_params)
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
    params.require(:message).permit(:content)
  end
end
