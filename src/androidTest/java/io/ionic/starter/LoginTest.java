package io.ionic.starter;

import android.app.Activity;
import android.content.Intent;
import android.support.test.espresso.web.webdriver.DriverAtoms;
import android.support.test.espresso.web.webdriver.Locator;
import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;
import android.test.suitebuilder.annotation.LargeTest;

import org.apache.cordova.CordovaActivity;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import static android.support.test.espresso.Espresso.onView;
import static android.support.test.espresso.web.assertion.WebViewAssertions.webMatches;
import static android.support.test.espresso.web.sugar.Web.onWebView;
import static android.support.test.espresso.web.webdriver.DriverAtoms.clearElement;
import static android.support.test.espresso.web.webdriver.DriverAtoms.findElement;
import static android.support.test.espresso.web.webdriver.DriverAtoms.getText;
import static android.support.test.espresso.web.webdriver.DriverAtoms.webClick;
import static org.hamcrest.core.StringContains.containsString;

@LargeTest
@RunWith(AndroidJUnit4.class)
public class LoginTest {

    private static final String EMAIL = "loira@email.com";
    private static final String SENHA = "123456";

    @Rule
    public ActivityTestRule<MainActivity> mActivityRule =
            new ActivityTestRule<MainActivity>(MainActivity.class,
                    true,false){
                @Override
                protected void afterActivityLaunched() {
                    onWebView().forceJavascriptEnabled();
                }
            };

    @Test
    public void loginTest() {

        mActivityRule.launchActivity(withWebFormIntent());
        //ion-input[contains(@type, 'email')]
        //inserindo texto de email
        onWebView().withElement(findElement(Locator.ID, "email"))
                //.perform(clearElement())
                .perform(DriverAtoms.webKeys(EMAIL))

                //inserindo senha

                .withElement(findElement(Locator.ID, "password"))
                //.perform(clearElement())
                .perform(DriverAtoms.webKeys(SENHA))

                //clicando botão ENTRAR
                .withElement(findElement(Locator.ID, "entrar"))
                .perform(webClick());

                    try {
                        Thread.sleep(6000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                onWebView().withElement(findElement(Locator.ID, "coleta"))
                .perform(webClick())

                        .withElement(findElement(Locator.XPATH, "//option[contains(@value, 'disc')]"))
                        .perform(webClick())

                        .withElement(findElement(Locator.XPATH, "//option[contains(@value, '1')]"))
                        .perform(webClick())

                        .withElement(findElement(Locator.ID, "abrir_leitor"))
                        .perform(webClick());

                try {
                    Thread.sleep(6000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                onWebView().withElement(findElement(Locator.ID, "botao_camera"))
                .perform(webClick());

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

                //achar botao

    }

    //@Test
    /*public void cadastro(){
        mActivityRule.launchActivity(withWebFormIntent());
        //ion-input[contains(@type, 'email')]
        //inserindo texto de email
        onWebView().withElement(findElement(Locator.ID, "cadastrar"))
                .perform(webClick())

                //inserindo senha

                .withElement(findElement(Locator.ID, "nome"))
                .perform(DriverAtoms.webKeys("Joaozinho"))

                .withElement(findElement(Locator.ID, "rg"))
                .perform(DriverAtoms.webKeys("12345678"))

                .withElement(findElement(Locator.ID, "nascimento"))
                .perform(DriverAtoms.webKeys("20/08/2000"))

                .withElement(findElement(Locator.ID, "email2"))
                .perform(DriverAtoms.webKeys("joaozinho@email.com"))

                .withElement(findElement(Locator.ID, "password2"))
                .perform(DriverAtoms.webKeys("123456"))

                .withElement(findElement(Locator.ID, "disciplinas"))
                .perform(webClick())

                .withElement(findElement(Locator.XPATH, "//option[contains(@value, 'SIF019 - Redes de Computadores II')]"))
                .perform(webClick())

                .withElement(findElement(Locator.XPATH, "//option[contains(@value, 'SIF032 - Engenharia de Software II')]"))
                .perform(webClick())

                .withElement(findElement(Locator.TAG_NAME, "button"))
                .perform(webClick());


        //achar botao

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }*/

    private static Intent withWebFormIntent() {
        Intent basicFormIntent = new Intent();
        basicFormIntent.putExtra(MainActivity.KEY_URL_TO_LOAD, MainActivity.WEB_FORM_URL);
        return basicFormIntent;
    }

}
