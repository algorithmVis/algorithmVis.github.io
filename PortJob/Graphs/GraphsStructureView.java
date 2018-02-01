package algorithms.Graphs;

import algorithms.SimpleSorting.EventManager;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.web.WebView;
import javafx.stage.Screen;
import javafx.stage.Stage;

import static algorithms.webViewUtils.Java2JavascriptUtils.connectBackendObject;

public class GraphsStructureView extends Application {

    private WebView webView;
    private final double screenHeight = 700;
    private final double screenWidth = Screen.getPrimary().getVisualBounds().getWidth();
    private EventManager eventManager;

    public static void main(String[] args) {
        System.setProperty("prism.lcdtext", "false"); // enhance fonts
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) throws Exception {
        createWindow(primaryStage, "/graphs.html");
    }

    private void createWindow(Stage primaryStage, String path) {
        webView = new WebView();
        eventManager = new EventManager(webView.getEngine());
        eventManager.setDelay(2000);

        // Use connectBackEndObject to connect an object to a js variable
        connectBackendObject(webView.getEngine(), "javaBinder", this);

        webView.getEngine().setOnAlert((event) -> System.out.println("WebView: " + event.getData()));

        primaryStage.setOnCloseRequest((i) -> System.exit(0));

        webView.setPrefSize(screenWidth, screenHeight);
        webView.getEngine().load(getClass().getResource(path).toExternalForm());
        webView.setContextMenuEnabled(false);

        primaryStage.setScene(new Scene(webView));
        primaryStage.setTitle("Graph Structure");
        primaryStage.show();
    }


}
