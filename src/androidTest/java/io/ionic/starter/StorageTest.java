package io.ionic.starter;

import android.content.Context;
import android.content.Intent;
import android.support.test.InstrumentationRegistry;
import android.support.test.espresso.web.webdriver.DriverAtoms;
import android.support.test.espresso.web.webdriver.Locator;
import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;
import android.support.test.uiautomator.By;
import android.support.test.uiautomator.UiDevice;
import android.support.test.uiautomator.UiObjectNotFoundException;
import android.support.test.uiautomator.UiSelector;
import android.support.test.uiautomator.Until;
import android.test.suitebuilder.annotation.LargeTest;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import static android.support.test.espresso.web.sugar.Web.onWebView;
import static android.support.test.espresso.web.webdriver.DriverAtoms.findElement;
import static android.support.test.espresso.web.webdriver.DriverAtoms.webClick;
import static org.hamcrest.core.IsNull.notNullValue;
import static org.junit.Assert.*;

@LargeTest
@RunWith(AndroidJUnit4.class)
public class StorageTest {
    //VARIAVEIS ESTATICAS PCOM AS INFORMAÇÕES DO TREPN PROFILER
    private static final String BASIC_SAMPLE_PACKAGE
            = "com.quicinc.trepn";
    private static final int LAUNCH_TIMEOUT = 5000;
    private static final String STRING_TO_BE_TYPED = "Trepn Profiler";
    //CLASSE PARA UIAUTOMATOR 2
    private UiDevice mDevice;

    private static final String EMAIL = "loira@email.com";
    private static final String SENHA = "123456";


    //INICIANDO TREPN PROFILER
    @Before
    public void startTrepnProfiler() {
        // INICICIALIZANDO INSTANCIA DO DISPOSITIVO
        mDevice = UiDevice.getInstance(InstrumentationRegistry.getInstrumentation());

        // INICIANDO HOME SCREEN
        mDevice.pressHome();

        // ESPERANDO PARA ABRIR O APP
        final String launcherPackage = mDevice.getLauncherPackageName();
        assertThat(launcherPackage, notNullValue());
        mDevice.wait(Until.hasObject(By.pkg(launcherPackage).depth(0)),
                LAUNCH_TIMEOUT);

        // INICIANDO O TREPN
        Context context = InstrumentationRegistry.getContext();
        final Intent intent = context.getPackageManager()
                .getLaunchIntentForPackage(BASIC_SAMPLE_PACKAGE);
        // LIMPANDO OUTRAS INSTANCIAS DO APP
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
        context.startActivity(intent);

        // ESPERANDO O APP ABRIR
        mDevice.wait(Until.hasObject(By.pkg(BASIC_SAMPLE_PACKAGE).depth(0)),
                LAUNCH_TIMEOUT);

        try {
            //CLICANDO NO BOTÃO PROFILE APP
            mDevice.findObject(new UiSelector()
                    .text("Profile App")
                    .className("android.widget.TextView")).click();

            //SELECIONANDO O PALMPHONE
            mDevice.findObject(new UiSelector()
                    .text("palphone-v2")
                    .className("android.widget.TextView")).click();
        } catch (UiObjectNotFoundException e) {
            e.printStackTrace();
        }

    }


    @Rule
    public ActivityTestRule<MainActivity> mActivityRule =
            new ActivityTestRule<MainActivity>(MainActivity.class,
                    false,false){
                @Override
                protected void afterActivityLaunched() {
                    onWebView().forceJavascriptEnabled();
                }
            };
    @Test
    public void storageTest() {

        //mActivityRule.launchActivity(withWebFormIntent());
        //ion-input[contains(@type, 'email')]
        //inserindo texto de email

        //esperando 2 segundos
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

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

        //esperando 4 segundos
        try {
            Thread.sleep(4000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        //CLICANDO NO BOTÃO COLETA
        onWebView().withElement(findElement(Locator.ID, "coleta"))
                .perform(webClick())


                //SELECIONANDO DISCIPLINA
                .withElement(findElement(Locator.XPATH, "//option[contains(@value, 'disc')]"))
                .perform(webClick())

                //SELECIONANDO NUMERO DE AULAS
                .withElement(findElement(Locator.XPATH, "//option[contains(@value, '1')]"))
                .perform(webClick())

                //ABRINDO CHAMADA
                .withElement(findElement(Locator.ID, "abrir_leitor"))
                .perform(webClick());

        //esperando 4 segundos
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        //INSERINDO 10 RAs
        for(int i = 0; i < 10; i++){
            onWebView().withElement(findElement(Locator.ID, "ra"))
                    .perform(DriverAtoms.webKeys(Integer.toString(i)));

            onWebView().withElement(findElement(Locator.ID, "botao_salvar"))
                    .perform(webClick());

            //esperando 2 segundos
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            onWebView().withElement(findElement(Locator.XPATH, "//button[contains(@class, 'alert-button')]"))
                    .perform(webClick());

            //esperando 2 segundos
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        //FINALIZANDO CHAMADA
        onWebView().withElement(findElement(Locator.ID, "botao_finalizar"))
                .perform(webClick());

        //CONFIRMANDO PROCESSO
        onWebView().withElement(findElement(Locator.XPATH, "//button[contains(@class, 'alert-button')]"))
                .perform(webClick());

        //esperando 2 segundos
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        //VOLTANDO AO MENU PRINCIPAL
        onWebView().withElement(findElement(Locator.XPATH, "//button[contains(@class, 'back-button')]"))
                .perform(webClick());

        //esperando 2 segundos
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        //SINCRONIZANDO DADOS NO FIREBASE
        onWebView().withElement(findElement(Locator.ID, "sincronizar"))
                .perform(webClick());

        //esperando 2 segundos
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        //CONFIRMANDO PROCESSO
        onWebView().withElement(findElement(Locator.XPATH, "//button[contains(@class, 'alert-button')]"))
                .perform(webClick());

        //esperando 2 segundos
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        //SAINDO DO SISTEMA
        onWebView().withElement(findElement(Locator.ID, "sair"))
                .perform(webClick());

        //esperando 2 segundos
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        //CONFIRMANDO PROCESSO
        onWebView().withElement(findElement(Locator.XPATH, "//button[contains(@class, 'alert-button')]"))
                .perform(webClick());
    }

    /*private static Intent withWebFormIntent(){
        Intent basicFormIntent = new Intent();
        basicFormIntent.putExtra(MainActivity.KEY_URL_TO_LOAD, MainActivity.WEB_FORM_URL);
        return basicFormIntent;
    }*/

    @After
    public void stopTrepnProfiler(){
        Context context = InstrumentationRegistry.getContext();
        final Intent intent = context.getPackageManager()
                .getLaunchIntentForPackage(BASIC_SAMPLE_PACKAGE);

        //ABRINDO APP
        context.startActivity(intent);

        try {
            //CLICANDO NO BOTÃO PROFILE APP
            mDevice.findObject(new UiSelector()
                    .text("Stop Profiling")
                    .className("android.widget.TextView")).click();

            //SELECIONANDO O PALMPHONE
            mDevice.findObject(new UiSelector()
                    .text("Save as .csv")
                    .className("android.widget.Button")).click();

            //SALVANDO ARQUIVO CSV
            mDevice.findObject(new UiSelector()
                    .text("Save")
                    .className("android.widget.Button")).click();
        } catch (UiObjectNotFoundException e) {
            e.printStackTrace();
        }
    }

}