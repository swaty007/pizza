<?php

namespace app\models;
use \yii\db\ActiveRecord;
use \yii\web\IdentityInterface;
use \Yii;

class User extends ActiveRecord implements IdentityInterface
{
    public $accessToken;


    /**
     * @inheritdoc
     *
     * @property string $username
     * @property string $email
     * @property string $password
     * @property string $authkey
     * @property integer $id
     */
    public static function tableName()
    {
        return 'users';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['username', 'email', 'password', 'authkey'], 'required'],
            [['username', 'email'], 'string', 'max' => 100],
            [['password', 'authkey'], 'string', 'max' => 500],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'username' => 'Username',
            'email' => 'Email',
            'password' => 'Password',
            'authkey' => 'Authkey',
        ];
    }

    /**
     * @inheritdoc
     */
    public static function findIdentity($id)
    {
        return (self::find()->where(['id' => $id])->count()) ? new static(self::find()->where(['id' => $id])->one()) : null;
    }

    /**
     * @inheritdoc
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        foreach (self::$users as $user) {
            if ($user['accessToken'] === $token) {
                return new static($user);
            }
        }

        return null;
    }

    /**
     * Finds user by username
     *
     * @param string $username
     * @return static|null
     */
    public static function findByUsername($username)
    {
        $u = self::find()->where(['username' => $username]);

        if($u->count())
        {
            return $u->one();
        }

        return null;
    }

    /**
     * @inheritdoc
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @inheritdoc
     */
    public function getAuthKey()
    {
        return $this->authkey;
    }
    /**
     * @inheritdoc
     */
    public function setPassword($password)
    {
        $this->password = md5($password);
    }
    /**
     * @inheritdoc
     */
    public function generateAuthKey()
    {
        $this->authkey = \Yii::$app->security->generateRandomString(32);
    }

    /**
     * @inheritdoc
     */
    public function validateAuthKey($authKey)
    {
        return $this->authkey === $authKey;
    }

    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return bool if password provided is valid for current user
     */
    public function validatePassword($password)
    {
        return $this->password === md5($password);
    }
    /**
     * @inheritdoc
     */
    public function changePassword($password,$password2)
    {
        if ($password === $password2)
        {
            $this->setPassword($password);
            $this->save();
        }
    }

    public function getUserTransactions($type = 'all',$limits = '',$order = 'id DESC')
    {
        if(Yii::$app->user->isGuest)
        {
            return [];
        }

        $aq = Transactions::find()->where(['user_id' => Yii::$app->user->getId()])->limits((string)$limits)->orderBy($order);

        switch ($type)
        {
            case 'all':
                return $aq->all();
                break;
            case 'deposit':
                return $aq->andWhere(['type' => 'deposit'])->all();
                break;
            case 'withdraw':
                return $aq->andWhere(['type' => 'withdraw'])->all();
                break;
            case 'mining':
                return $aq->andWhere(['type' => 'mining'])->all();
                break;
            default:
                return [];
                break;
        }
    }
}
