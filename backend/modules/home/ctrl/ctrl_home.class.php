<?php
 if (isset($_SESSION["tiempo"])) {  
    $_SESSION["tiempo"] = time();
}
class ctrl_home {
    function carrousel_brand() {
        echo json_encode(common::load_models('home_model', 'get_carousel'));
    }

    function categ() {
        echo json_encode(common::load_models('home_model', 'get_categoria'));
    }

    function type() {
        echo json_encode(common::load_models('home_model', 'get_type'));
    }

    function load_more() {
        echo json_encode(common::load_models('home_model', 'get_load_more'));
    }

}

?>