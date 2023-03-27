import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/domain/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ClientService } from '../../services/client.service';
import { Client } from '../../domain/client';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './client.component.html',
    providers: [MessageService]
})
export class ClientComponent implements OnInit {

    clientDialog: boolean = false;

    deleteClientDialog: boolean = false;

    deleteClientsDialog: boolean = false;

    clients:Array<Client> = [];;

    client: Client = {};

    half_cast: any =  [];

    selectedClients: Client[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private clientService: ClientService, private messageService: MessageService) { }

    ngOnInit() {   
        
            this.cols = [
                { field: 'name', header: 'Name' },
                { field: 'email', header: 'Email' },
                { field: 'adresse', header: 'Adresse' },
                { field: 'telephone', header: 'Telephone' }
            ];
    
    this.clientService.getAllClients()
    .subscribe((data)=>{
        //this.isLoading = false
        //this.half_cast = JSON.parse(JSON.stringify(data))
    this.half_cast.forEach((client: { [x: string]: any; }) => this.clients.push({
            'id': client['id'],
            'username': client['username'],
            'email': client['email'],
            'adresse': client['adresse'],
            'telephone': client['telephone']
           
          }));
   
          })
        
        } 
       
   
   
    openNew() {
        this.client = {};
        this.submitted = false;
        this.clientDialog = true;
    }

    deleteSelectedClients() {
        this.deleteClientsDialog = true;
    }

    editClient(client: Client) {
        this.client = { ...client };
        this.clientDialog = true;
    }

    deleteClient(client: Client) {
        this.deleteClientDialog = true;
        this.client = { ...client };
    }

    confirmDeleteSelected() {
        this.deleteClientsDialog = false;
        this.clients = this.clients.filter(val => !this.selectedClients.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Clients Deleted', life: 3000 });
        this.selectedClients = [];
    }

    confirmDelete() {
        this.deleteClientDialog = false;
        this.clients = this.clients.filter(val => val.id !== this.client.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Deleted', life: 3000 });
        this.client = {};
    }

    hideDialog() {
        this.clientDialog = false;
        this.submitted = false;
    }

    saveClient() {
        this.submitted = true;

        if (this.client.username?.trim()) {
            if (this.client.id) {
                // @ts-ignore
                this.clients[this.findIndexById(this.client.id)] = this.client;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Updated', life: 3000 });
            } else {
                this.client.id = this.createId();
                this.client.username ;
                this.client.email ;
                this.client.adresse ;    
                this.client.telephone ; 
                // @ts-ignore
                this.clients.push(this.client);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Created', life: 3000 });
            }

            this.clients = [...this.clients];
            this.clientDialog = false;
            this.client = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.clients.length; i++) {
            if (this.clients[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}