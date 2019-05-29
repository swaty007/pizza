<?php
namespace app\models;
use Yii;
use yii\base\Model;
use app\models\User;
/**
 * Signup form
 */
class SignupForm extends Model
{
    public $username;
    public $email;
    public $password;
    public $password2;
    public $agree;
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['username', 'trim'],
            ['username', 'required'],
            ['username', 'unique', 'targetClass' => 'app\models\User', 'message' => 'This username has already been taken.'],
            ['username', 'string', 'min' => 2, 'max' => 255],
            ['email', 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'string', 'max' => 255],
            ['email', 'unique', 'targetClass' => 'app\models\User', 'message' => 'This email address has already been taken.'],
            ['password', 'required'],
            ['password', 'string', 'min' => 6],
            ['password2', 'string', 'min' => 6],
            ['password2', 'compare', 'compareAttribute' => 'password', 'message' => 'Passwords does not compare.'],
        ];
    }
    /**
     * Signs user up.
     *
     * @return User|null the saved model or null if saving fails
     */
    public function signup()
    {
        if (!$this->validate()) {
            return null;
        }

            $user = new User();

            $user->username = $this->username;
            $user->email = $this->email;

            $user->setPassword($this->password);
            $user->generateAuthKey();

            if($user->validate() && $user->save())
            {
                Yii::$app->user->login($user,3600*24);
                $address = new Address();
                $address->u_email = $user->email;
                $address->save();
                return $user;
            } else {
                return null;
            }

    }
}