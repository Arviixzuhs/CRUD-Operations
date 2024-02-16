package SIGU.Api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import SIGU.Api.models.UserModel;

@Repository
public interface IUserRepository extends JpaRepository<UserModel, Long> {

}