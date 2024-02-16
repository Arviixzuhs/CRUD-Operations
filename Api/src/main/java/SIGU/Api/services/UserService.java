package SIGU.Api.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import SIGU.Api.models.UserModel;
import SIGU.Api.repositories.IUserRepository;

@Service
public class UserService {
    @Autowired
    IUserRepository userRepository;

    public ArrayList<UserModel> getUsers() {
        return (ArrayList<UserModel>) userRepository.findAll();
    }

    public UserModel saveUser(UserModel user) {
        return userRepository.save(user);
    }

    public Optional<UserModel> getById(Long id) {
        return userRepository.findById(id);
    }

    public UserModel updateById(UserModel request, Long id) {
        UserModel user = userRepository.findById(id).get();

        String name = request.getName();
        String avatar = request.getAvatar();
        Integer age = request.getAge();
        String email = request.getEmail();
        String lastName = request.getLastName();
        String role = request.getRole();
        Integer salary = request.getSalary();
        String status = request.getStatus();
        String team = request.getTeam();

        if (name != null) {
            user.setName(name);
        }

        if (avatar != null) {
            user.setAvatar(avatar);
        }

        if (age != null) {
            user.setAge(age);
        }

        if (email != null) {
            user.setEmail(email);
        }

        if (lastName != null) {
            user.setLastName(lastName);
        }

        if (role != null) {
            user.setRole(role);
        }

        if (salary != null) {
            user.setSalary(salary);
        }

        if (status != null) {
            user.setStatus(status);
        }

        if (team != null) {
            user.setTeam(team);
        }

        userRepository.save(user);
        return user;
    }

    public Boolean deleteById(Long id) {
        try {
            userRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
