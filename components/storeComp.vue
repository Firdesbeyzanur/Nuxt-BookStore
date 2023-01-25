<template>
    <div>
        <v-col class="text-right">
            <!-- Burası benim addBook için açılan pop-up'ım -->
            <v-dialog v-model="bookAdd" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn dark v-bind="attrs" v-on="on" @click="bookAdd = true">
                        Add Book
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <!-- Burada add kısmı için name ve price değerlerini verdik -->
                                    <!-- Bu değerleri data kısmında tanıttık -->
                                    <v-text-field label="Name" v-model="book.name"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Price" v-model="book.price"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <!-- Burada add kısmı için açılan pop-up kısmı var burada save kısmını click ile methotsda bağlıyoruz.  -->
                        <v-btn color="blue darken-1" text @click="bookAdd = false">
                            Close
                        </v-btn>
                        <v-btn color="blue darken-1" :loading="loading" text @click="addBooks">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
        <v-data-table :items="getBook" :headers="headers" :loading="getAllDataLoading">
            <template v-slot:[`item.actions`]="{ item }">
                <!-- Edit kısmı data-tablenin dışında olmalı -->
                <div>
                    <!-- Edit Butonu -->
                    <v-btn dark @click="bookEdit(item)">
                        <v-icon color="primary">mdi-book-edit</v-icon>
                    </v-btn>
                    <v-btn>
                        <!-- Delete Butonu -->
                        <v-icon @click="deleteBooks(item)" color="error">mdi-delete</v-icon>
                    </v-btn>
                </div>
            </template>
        </v-data-table>
        <v-dialog v-model="edit" persistent max-width="600px">
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Name" v-model="currentBook.name"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Price" v-model="currentBook.price"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <!-- Edit kısmının save ve close kısmı save kısmını methodsa bağladık -->
                    <v-btn color="red darken-1" text @click="edit = false">
                        Close
                    </v-btn>
                    <v-btn color="red darken-1" text @click="updateBooks">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>

export default {
    name: 'storeComp',
    data() {
        return {
            getBook: [],

            headers: [
                {
                    text: 'Id',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                { text: 'Name', value: 'name' },
                { text: 'Price', value: 'price' },
                { text: 'Actions', value: 'actions' },
            ],
            bookAdd: false,
            edit: false,
            book: {
                name: "",
                price: 0
            },
            currentBook: {},
            loading: false,
            getAllDataLoading: false,
        };
    },

    created() {

        this.getAllBooks()
    },
    methods: {
        async deleteBooks(item) {
            this.$store.dispatch('books/deleteBook', item.id).then(res => {
                this.getAllBooks()
            })
        },
        async addBooks() {
            this.loading = true
            this.$store.dispatch('books/addBook', this.book).then(res => {
                this.getAllBooks()
                this.bookAdd = false
                this.book.name = '';
                this.book.price = ''

            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                this.loading = false
            })
        },
        async updateBooks() {
            this.$store.dispatch('books/updateBook', this.currentBook).then(res => {
                this.getAllBooks()
                this.edit = false

            })
        },
        bookEdit(item) {
            this.edit = true;
            this.currentBook = item;
        },
        getAllBooks() {
            this.getAllDataLoading = true;
            this.$store.dispatch('books/selectBook').then((data) => {
                this.getBook = data
            }).catch((errorr) => {
                console.log(errorr)
            }).finally(() => {
                this.getAllDataLoading = false
            })
        }
    }
}
</script>
  
<style>

</style>