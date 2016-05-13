class RegistrationsController < Devise::RegistrationsController

  def create
    user = User.create(sign_up_params)
    if(user.save)
      sign_in(:user, user)
      redirect_to "/boards"
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  def after_sign_up_path_for(resource)
    "/boards"
  end

  def after_inactive_sign_up_path_for(resource)
    "/newuser"
  end
end
