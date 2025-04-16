package com.example.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.jwtModule.models.AppUser;
import com.example.backend.models.Reclamation;
import com.example.backend.models.ServiceModel;
import com.example.backend.repositories.ReclamationRepo;
import com.example.backend.repositories.ServiceRepositorie;
import com.example.backend.repositories.UsersRepo;

@Service
public class Myservice {

    @Autowired
    ServiceRepositorie mySerciceRepo;
    @Autowired
    UsersRepo usersRepo;
    @Autowired
    private ReclamationRepo reclaRepo;

    public List<ServiceModel> getAll() {

        return mySerciceRepo.findAll();
    }

    public ServiceModel addService(ServiceModel newService) {
        mySerciceRepo.save(newService);
        return newService;
    }

    public String deleteService(Long id) {
        Optional<ServiceModel> optionalService = mySerciceRepo.findById(id);
        if (optionalService.isPresent()) {
            ServiceModel s = optionalService.get();
            mySerciceRepo.delete(s);
            return "service est delete";
        } else {
            return "service pas delete";
        }

    }

    public List<Reclamation> getallreclamation() {

        return reclaRepo.findAll();
    }

    public String updateReclamtion(Long id, Reclamation recla) {
        Optional<Reclamation> optionreclamtion = reclaRepo.findById(id);
        if (optionreclamtion.isPresent()) {
            Reclamation re = optionreclamtion.get();
            if (recla.getDescription() != null) {
                re.setDescription(recla.getDescription());
            }
            reclaRepo.save(re);
            return "reclamtion est modifie";
        }
        return "reclamtion ne pas modifie";

    }

    public String deltereclamtion(Long id) {
        Optional<Reclamation> optionreclamtion = reclaRepo.findById(id);
        if (optionreclamtion.isPresent()) {
            Reclamation re = optionreclamtion.get();

            reclaRepo.delete(re);
            return "reclamtion est delete";
        }
        return "reclamtion pas delete ";
    }

}
