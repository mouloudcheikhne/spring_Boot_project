package com.example.backend.controllers;

import java.util.List;
import java.util.Map;
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
import com.example.backend.models.Predict;
import com.example.backend.models.Ticket_comments;
import com.example.backend.repositories.Ticket_commentsRepo;
import com.example.backend.repositories.TicketsRepo;
import com.example.backend.services.Myservice;

import jakarta.transaction.Transactional;

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
    public String createticket(@RequestBody DtoTickets ticket) {
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

    @PostMapping("/admin/ajouttikets")
    public String ajouteticktes(@RequestBody DtoTickets ticket) {

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

    @GetMapping("/user/alltickts")
    public ResponseEntity<?> getallyickesuser() {
        // try{

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<AppUser> opuser = userrepo.findByEmail(email);
        if (opuser.isPresent()) {
            AppUser user = opuser.get();
            // myrepo.findByUserticktes(user.getId())
            return ResponseEntity.ok(myrepo.findByUserticktes(user.getId()));
        }
        // }catch(Exception e){

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", "\"le il ya pas de donne"));
        // }
    }

    @GetMapping("/agent/alltickts")
    public ResponseEntity<?> getallyickesAgent() {
        // try{

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<AppUser> opuser = userrepo.findByEmail(email);
        if (opuser.isPresent()) {
            AppUser user = opuser.get();
            // myrepo.findByUserticktes(user.getId())
            return ResponseEntity.ok(myrepo.findByAgentticktes(user.getId()));
        }
        // }catch(Exception e){

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", "\"il ya pas de donne"));
        // }
    }

    @PostMapping("/agent/ticket/status/{id}")
    public String changestatusavecagent(@PathVariable Long id, @RequestBody Tickets entity) {
        //TODO: process POST request

        return myservice.changeStatus(id, entity);

    }

    @GetMapping("/agent/commitsagent")
    public ResponseEntity<?> getcommit() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<AppUser> opuser = userrepo.findByEmail(email);
        if (opuser.isPresent()) {
            AppUser user = opuser.get();
            // System.out.println(user.getId());
            List<Ticket_comments> v = ticketcommentsRepo.findcommintuser(user.getId());
            System.out.println(v);
            return ResponseEntity.ok(ticketcommentsRepo.findcommintuser(user.getId()));
        }
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", "\"il ya pas de donne"));
    }

    @GetMapping("/agent/hhhh/{ticktid}/{userg}")
    public ResponseEntity<?> getComments(@PathVariable Long ticktid, @PathVariable Long userg) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<AppUser> opuser = userrepo.findByEmail(email);
        if (opuser.isPresent()) {
            AppUser user = opuser.get();

            // Check if agentId is the one in session (for extra validation, optional)
            // if (!user.getId().equals(1)) {
            //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            //             .body(Map.of("message", "Unauthorized access"));
            // }
            System.out.println(ticktid);
            System.out.println(userg);
            List<Ticket_comments> comments = ticketcommentsRepo.findFilteredComments(userg, ticktid, user.getId());

            if (comments.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT)
                        .body(Map.of("message", "No comments found"));
            }

            return ResponseEntity.ok(comments);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", "User not found"));
    }

    @GetMapping("/user/hhhh/{ticktid}")
    public ResponseEntity<?> getComments(@PathVariable Long ticktid) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<AppUser> opuser = userrepo.findByEmail(email);
        if (opuser.isPresent()) {
            AppUser user = opuser.get();

            System.out.println(ticktid);

            List<Ticket_comments> comments = ticketcommentsRepo.findFilteredCommentsuser(user.getId(), ticktid);

            if (comments.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT)
                        .body(Map.of("message", "No comments found"));
            }

            return ResponseEntity.ok(comments);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", "User not found"));
    }

    @PostMapping("/agent/ajoutecommit")
    public String agentcommit(@RequestBody DtoTicket_comment entity) {
        //TODO: process POST request

        Optional<AppUser> opuser = userrepo.findById(entity.getUserid());
        if (opuser.isPresent()) {
            AppUser user = opuser.get();

            Optional<Tickets> tik = myrepo.findById(entity.getTicket_id());
            if (tik.isPresent()) {
                Tickets idTiktes = tik.get();

                Ticket_comments ticketsComt = Ticket_comments.builder()
                        .user_id(user)
                        .message(entity.getMessage())
                        .ticket_id(idTiktes)
                        .differenceuser(true)
                        .build();
                ticketcommentsRepo.save(ticketsComt);
                return "commit est transfer ";

            }
        }

        return "commit pas  transfaire";
    }

    @PostMapping("/agent/predict")
    public ResponseEntity<?> predictAgent(@RequestBody Predict entity) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<AppUser> opuser = userrepo.findByEmail(email);
        
        if (opuser.isPresent()) {
            AppUser user = opuser.get(); // <-- point-virgule ajouté ici
            return myservice.getPrediction(user.getId(), entity.getDate());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "il ya une erreur"));
        }
    }
    @PostMapping("/admin/predict_tout_agent")
    public ResponseEntity<?> predictToutAgent(@RequestBody Predict entity) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<AppUser> opuser = userrepo.findByEmail(email);
        
        if (opuser.isPresent()) {
            AppUser user = opuser.get(); // <-- point-virgule ajouté ici
            return myservice.getpredictionToutAgent( entity.getDate());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "il ya une erreur"));
        }
    }
    

}
