class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      if @user.email == "guest_user"
        @user.reset_guest_account
        @user.setup_new_account
      end

      login(@user)
      render "api/users/show"
    else
      render(
        json: {
          base: ["Invalid email/password combination"]
        },
        status: 401
      )
    end
  end

  def destroy
    @user = current_user
    if @user
      logout
      render(
        json: {
          base: ["Session deleted"]
        }
      )
    else
      render(
        json: {
          base: ["Nobody signed in"]
        },
        status: 404
      )
    end
  end


end
