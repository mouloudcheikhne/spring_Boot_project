package com.example.backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.jwtModule.models.AppUser;
import com.example.backend.jwtModule.repositories.UserRepository;
import com.example.backend.models.DtoTicket_comment;
import com.example.backend.models.Tickets;
import com.example.backend.models.DtoTickets;
import com.example.backend.models.Ticket_comments;
import com.example.backend.repositories.Ticket_commentsRepo;
import com.example.backend.repositories.TicketsRepo;
import com.example.backend.services.Myservice;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class mycontrollers {

    @Autowired
    private Myservice myservice;

    @Autowired
    private TicketsRepo myrepo;
    @Autowired
    private UserRepository userrepo;
    @Autowired
    private Ticket_commentsRepo ticketcommentsRepo;

    @PostMapping("/user/ticket")
    public String reclamation(@RequestBody DtoTickets ticket) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<AppUser> opuser = userrepo.findByEmail(email);
        if (opuser.isPresent()) {
            Optional<AppUser> optionAgent = userrepo.findById(ticket.getUser_agent());
            if (optionAgent.isPresent()) {

                AppUser userAgent = optionAgent.get();
                AppUser user = opuser.get();
                Long id_user = user.getId();

                // description service
                Tickets tickets = Tickets.builder()
                        .description(ticket.getDescription())
                        .title(ticket.getTitle())
                        .user_id(user)
                        .user_AGENT(userAgent)
                        .status("open")
                        .build();
                myrepo.save(tickets);
                return "tickets est enregestre";
            }

            // title status user_id user_AGENT
        }
        return "tickets pas enrengestre";
    }

    @GetMapping("/admin/tickes")
    public List<Tickets> getALLTickets() {
        return myservice.getALLticktes();
    }

    @GetMapping("/admin/tickes/delte/{id}")
    public String delteticktes(@PathVariable Long id) {
        return myservice.deleteTickets(id);
    }

    @PostMapping("/admin/tickes/update/{id}")
    public String updateTickets(@PathVariable Long id, @RequestBody DtoTickets tek) {
        return myservice.updateTickets(id, tek);
    }

    @PostMapping("/admin/ticket/status/{id}")
    public String postMethodName(@PathVariable Long id, @RequestBody Tickets entity) {
        //TODO: process POST request

        return myservice.changeStatus(id, entity);
    }

    @PostMapping("/user/ticket_comments")
    public String postMethodName(@RequestBody DtoTicket_comment entity) {
        //TODO: process POST request
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<AppUser> opuser = userrepo.findByEmail(email);
        if (opuser.isPresent()) {
            AppUser user = opuser.get();

            Optional<Tickets> tik = myrepo.findById(entity.getTicket_id());
            if (tik.isPresent()) {
                Tickets idTiktes = tik.get();

                Ticket_comments ticketsComt = Ticket_comments.builder()
                        .user_id(user)
                        .message(entity.getMessage())
                        .ticket_id(idTiktes)
                        .build();
                ticketcommentsRepo.save(ticketsComt);
                return "tickets est enregestre";

            }
        }

        return "ticketsComt est pas enregstre";
    }

    @GetMapping("/admin/allticketcomments")
    public List<Ticket_comments> getallticket_comments() {
        return ticketcommentsRepo.findAll();
    }

    @GetMapping("/admin/ticket_comments/delete/{id}")
    public String deleteticket_comments(@PathVariable Long id) {
        return myservice.deleteticket_comments(id);
    }

    @PutMapping("/admin/ticketComments/update/{id}")
    public String ticketCommentsUpdate(@PathVariable Long id, @RequestBody DtoTicket_comment entity) {
        //TODO: process PUT request

        return myservice.ticketCommentsUpdate(id, entity);
    }

    // @Autowired
    // private ReclamationRepo reclaRepo;
    // @CrossOrigin(origins = "http://localhost:3000")
    // @GetMapping("/service")
    // public List<Ticket_comments> getALLServices() {
    //     return myservice.getAll();
    // }
    // @PostMapping("/admin/add/service")
    // public Ticket_comments addService(@RequestBody Ticket_comments newService) {
    //     return myservice.addService(newService);
    // }
    // @GetMapping("/admin/delete/service/{id}")
    // public String getMethodName(@PathVariable Long id) {
    //     return myservice.deleteService(id);
    // }
    // @PostMapping("/admin/updateservice/{id}")
    // public ResponseEntity<?> updateService(@PathVariable Long id, @RequestBody Ticket_comments Ser) {
    //     Optional<Ticket_comments> optionalservice = myrepo.findById(id);
    //     if (optionalservice.isPresent()) {
    //         Ticket_comments s = optionalservice.get();
    //         if (Ser.getNom() != null) {
    //             s.setNom(Ser.getNom());
    //             // description
    //         }
    //         if (Ser.getDescription() != null) {
    //             s.setDescription(Ser.getDescription());
    //             // description
    //         }
    //         myrepo.save(s);
    //         return ResponseEntity.ok("service est modifie");
    //     }
    //     return ResponseEntity.status(HttpStatus.NOT_FOUND).body("service pas mewjoude");
    // }
    // @PostMapping("/user/recalamtion/{id}")
    // public String reclamation(@PathVariable Long id, @RequestBody Tickets recl) {
    //     String email = SecurityContextHolder.getContext().getAuthentication().getName();
    //     Optional<AppUser> opuser = userrepo.findByEmail(email);
    //     if (opuser.isPresent()) {
    //         Optional<Ticket_comments> optionservice = myrepo.findById(id);
    //         if (optionservice.isPresent()) {
    //             Ticket_comments serviceM = optionservice.get();
    //             AppUser user = opuser.get();
    //             Long id_user = user.getId();
    //             String description = recl.getDescription();
    //             // description service
    //             Tickets reclamation = Tickets.builder()
    //                     .description(recl.getDescription())
    //                     .user(user)
    //                     .service(serviceM)
    //                     .build();
    //             reclaRepo.save(reclamation);
    //             return "reclamtion est enregestre";
    //         }
    //     }
    //     return "recalamtion pas enrengestre";
    // }
    // @GetMapping("/admin/recalmations")
    // public List<Tickets> getallrecalmation() {
    //     return myservice.getallreclamation();
    // }
    // @PostMapping("/admin/updatereclamtion/{id}")
    // public String postMethodName(@PathVariable Long id, @RequestBody Tickets entity) {
    //     return myservice.updateReclamtion(id, entity);
    // }
    // @GetMapping("/admin/deleterecalmtion/{id}")
    // public String deltereclamtion(@PathVariable Long id) {
    //     return myservice.deltereclamtion(id);
    // }
    // @GetMapping("/admin/changereclamtion/{id}")
    // public String changeEtatReclamtion(@PathVariable Long id) {
    //     return myservice.changeEtatRecla(id);
    // }
}
