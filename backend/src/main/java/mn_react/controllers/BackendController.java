package mn_react.controllers;

import io.micronaut.http.annotation.*;

@Controller("/backend")
public class BackendController {

    @Get(uri="/", produces="text/plain")
    public String index() {
        return "Example Response";
    }
}