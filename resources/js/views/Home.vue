<template>
    <div class="container mx-auto mt-[100px]">
        <div class="flex justify-between items-center">
            <div></div>
            <h1 class="text-3xl font-bold mb-8 text-center">
                Manage Employees
            </h1>
            <div>
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-1 px-8"
                    @click.prevent="save"
                >
                    Add
                </button>
            </div>
        </div>
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3">Name</th>
                    <th scope="col" class="px-6 py-3">Job Title</th>
                    <th scope="col" class="px-6 py-3">Salary</th>
                    <th scope="col" class="px-6 py-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="allEmployees.data && allEmployees.data.length">
                    <tr
                        class="bg-white border-b"
                        v-for="(employee, key) in allEmployees.data"
                    >
                        <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                            {{ employee.name }}
                        </th>
                        <td class="px-6 py-4">{{ employee.job_title }}</td>
                        <td class="px-6 py-4">
                            {{
                                employee.salary.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })
                            }}
                        </td>
                        <td class="px-6 py-4">
                            <button
                                class="py-2 px-2 bg-blue-900 text-white rounded-full"
                                @click.prevent="editEmployee(employee)"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-4 h-4"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                    />
                                </svg>
                            </button>
                            <button
                                class="py-2 px-2 bg-red-900 text-white rounded-full ms-2"
                                @click.prevent="deleteEmployee(employee.id)"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-4 h-4"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr class="text-center">
                        <td class="py-2" colspan="4">No Data Found</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
    <Modal v-if="openModal" @close="closeModal">
        <template #header> Employee </template>
        <template #body>
            <Form @close="closeModal" />
        </template>
        <template #footer> <div></div></template>
    </Modal>
</template>
<script setup>
import Modal from "@components/common/Modal.vue";
import Form from "@components/employee/Form.vue";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useEmployeeStore } from "@store/employee";
import { useToast } from "vue-toastification";

const { allEmployees } = storeToRefs(useEmployeeStore());

const openModal = ref(false);
const toast = useToast();

const { fetchEmployees, setCurrentEmployee, deleteEmployeeById } =
    useEmployeeStore();

const save = () => {
    openModal.value = true;
};

const closeModal = () => {
    openModal.value = false;
    setCurrentEmployee({});
};

onMounted(() => {
    fetchEmployees();
});

const deleteEmployee = async (id) => {
    let result = confirm("Are you sure you want to delete?");
    if (result) {
        await deleteEmployeeById(id);
        toast.success("Employee Deleted Successfully!");
    }
};

const editEmployee = (employee) => {
    setCurrentEmployee(employee);
    openModal.value = true;
};
</script>
