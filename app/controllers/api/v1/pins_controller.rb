class Api::V1::PinsController < ApplicationController
  def index
    @pins = Pin.all
    render 'index.json.jbuilder'
  end
end