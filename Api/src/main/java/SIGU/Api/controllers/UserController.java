package SIGU.Api.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import SIGU.Api.models.UserModel;
import SIGU.Api.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173", methods = {
        RequestMethod.GET,
        RequestMethod.PUT,
        RequestMethod.POST,
        RequestMethod.PATCH,
        RequestMethod.DELETE,
})

@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/allusers")
    public ArrayList<UserModel> getUsers() {
        return this.userService.getUsers();
    }

    @PostMapping("/save")
    public UserModel saveUser(@RequestBody UserModel user) {
        return this.userService.saveUser(user);
    }

    @GetMapping(path = "/get/{id}")
    public Optional<UserModel> getUserById(@PathVariable("id") Long id) {
        return this.userService.getById(id);
    }

    @PutMapping(path = "/edit/{id}")
    public UserModel updateUserById(@RequestBody UserModel request, @PathVariable("id") Long id) {
        return this.userService.updateById(request, id);
    }

    @DeleteMapping(path = "/delete/{id}")
    public String deleteUserById(@PathVariable("id") Long id) {
        boolean ok = this.userService.deleteById(id);
        if (ok) {
            return "Usuario eliminado correctamente";
        } else {
            return "No se pudo eliminar al usuario";
        }
    }
}
