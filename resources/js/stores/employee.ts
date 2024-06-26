import { defineStore } from "pinia";
import api from "./../plugins/axios";

export const useEmployeeStore = defineStore({
    id: "employeeStore",
    state: () => ({
        allEmployees: {
            data: [],
        },
        employee: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchEmployees() {
            this.allEmployees.data = [];
            this.loading = true;
            try {
                await api
                    .get(`employee`)
                    .then((response) => {
                        this.allEmployees.data = response.data.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                this.loading = false;
            } catch (error) {
                console.log(error);
            }
        },
        async storeEmployee(payload: any) {
            try {
                await api.post("/employee", payload).then((response) => {
                    this.allEmployees.data.unshift(response.data.data);
                });
            } catch (error) {
                console.log(error);
            }
        },
        async updateEmployee(payload: any) {
            try {
                await api
                    .put(`/employee/${payload.id}`, payload)
                    .then((response) => {
                        const { data } = response.data;
                        this.allEmployees.data = this.allEmployees.data.map(
                            (e) => (e.id === data.id ? data : e)
                        );
                    });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteEmployeeById(id: number) {
            try {
                await api.delete(`/employee/${id}`);
                this.allEmployees.data.splice(
                    this.allEmployees.data.findIndex((e) => e.id === id),
                    1
                );
            } catch (error) {
                console.log(error);
            }
        },
        setCurrentEmployee(data = []) {
            this.employee = data;
        },
    },
});
