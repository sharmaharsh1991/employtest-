<template>
    <div class="w-full">
        <form class="bg-white shadow-sm rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="name"
                >
                    Name
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Name"
                    v-model="form.name"
                    @blur="v$.name.$touch"
                />
                <p
                    class="mt-2 text-red-600"
                    v-for="error in v$.name.$errors"
                    :key="error.$uid"
                >
                    Name is required
                </p>
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="job-title"
                >
                    Job Title
                </label>
                <input
                    class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="text"
                    type="text"
                    placeholder="Job Title"
                    v-model="form.job_title"
                    @blur="v$.job_title.$touch"
                />
                <p
                    class="mt-2 text-red-600"
                    v-for="error in v$.job_title.$errors"
                    :key="error.$uid"
                >
                    Job title is required
                </p>
            </div>
            <div class="mb-6">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="salaries"
                >
                    Salary
                </label>
                <input
                    class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="text"
                    type="text"
                    placeholder="Salary"
                    v-model="form.salary"
                    @blur="v$.salary.$touch"
                />
                <p
                    class="mt-2 text-red-600"
                    v-for="error in v$.salary.$errors"
                    :key="error.$uid"
                >
                    {{ error.$message }}
                </p>
            </div>
            <div class="flex items-center justify-center">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    :class="{
                        'loader-ring': serverIsBusy,
                    }"
                    type="button"
                    @click.prevent="saveEmployee"
                >
                    Save
                </button>
            </div>
        </form>
    </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, numeric, helpers } from "@vuelidate/validators";
import { useEmployeeStore } from "@store/employee";
import { storeToRefs } from "pinia";
const { storeEmployee, updateEmployee } = useEmployeeStore();
const emit = defineEmits("close");
const { employee } = storeToRefs(useEmployeeStore());
import { useToast } from "vue-toastification";

const form = reactive({
    id: employee.value?.id || null,
    name: employee.value?.name || null,
    job_title: employee.value?.job_title || null,
    salary: employee.value?.salary || null,
});

const toast = useToast();

const serverIsBusy = ref(false);

const rules = {
    name: { required },
    job_title: { required },
    salary: {
        required: helpers.withMessage("Salary is required", required),
        numeric: helpers.withMessage("Salary must be numeric", numeric),
    },
};

const v$ = useVuelidate(rules, form);

const saveEmployee = async () => {
    const result = await v$.value.$validate();
    if (result) {
        serverIsBusy.value = true;
        if (form.id) {
            await updateEmployee({ ...form });
            toast.success("Employee Updated Successfully!");
        } else {
            await storeEmployee({ ...form });
            toast.success("Employee Added Successfully!");
        }
        emit("close");
        serverIsBusy.value = false;
    }
};
</script>
