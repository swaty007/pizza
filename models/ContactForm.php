<?php

namespace app\models;

use Yii;
use yii\base\Model;

/**
 * ContactForm is the model behind the contact form.
 */
class ContactForm extends Model
{
    public $name;
    public $email;
    public $telephone;
    public $body;
    public $verifyCode;
    public $hidden;


    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            // name, email, subject and body are required
            [['name', 'email', 'telephone', 'hidden'], 'required'],
            // email has to be a valid email address
            ['email', 'email'],
            // verifyCode needs to be entered correctly
//            ['verifyCode', 'captcha'],
        ];
    }

    /**
     * @return array customized attribute labels
     */
    public function attributeLabels()
    {
        return [
            'verifyCode' => 'Verification Code',
        ];
    }

    /**
     * Sends an email to the specified email address using the information collected by this model.
     * @param string $email the target email address
     * @return bool whether the model passes validation
     */
    public function contact($email)
    {
        if ($this->validate()) {

            /* получатели */
            $to = Yii::$app->params['adminEmail'];
//            $to= Yii::$app->params['adminEmail'] . ", " ; //обратите внимание на запятую
//            $to .= "Kelly <swaty0007@gmail.com>";

            /* тема/subject */
            $subject = "Новая заявка";

            /* сообщение */
            $message = "
<html>
<head>
 <title>Действие на сайте</title>
</head>
<body>
<p><strong>Пользователь отправил сообщение с: </strong> $this->hidden</p>
<h2>Данные о пользователе</h2>
<p><strong>Имя: </strong>$this->name </p>
<p><strong>email: </strong>$this->email </p>
<p><strong>body: </strong>$this->body </p>
<p><strong>telephone: </strong>$this->telephone </p>
</body>
</html>
";

            /* Для отправки HTML-почты вы можете установить шапку Content-type. */
            $headers= "MIME-Version: 1.0\r\n";
            $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
            /* дополнительные шапки */
            $headers .= "From: ".Yii::$app->params['siteName'].'.info'."<".Yii::$app->params['supportEmail'].">\r\n";
            $headers .= "Cc: swaty0007@gmail.com\r\n"; //копия
            mail($to, $subject, $message, $headers);

//            Yii::$app->mailer->compose()
//                ->setFrom([Yii::$app->params['supportEmail'] => Yii::$app->params['siteName'] . ' bot'])
//                ->setTo('swaty0007@gmail.com')
//                ->setFrom($this->email)
//                ->setSubject($this->subject)
//                ->setTextBody($this->body)
//                ->send();
//
            return true;
        }
        return false;
    }
}
