import React from 'react';

import PatientTable from './components/tables//PatientsTable';
import ExamsForm from './components/ExamsForm';
import ExamModal from './components/ExamModal';
import { useState } from 'react';

function AdminExams() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openBackdropTable, setOpenBackdropTable] = React.useState(false);
  const [patient, setPatient] = React.useState({
    fullName: '',
    _id: ''
  });

  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mt-6">
            Cadastro de Exames
          </h3>
          <p className="mt-1 text-sm text-gray-600 mb-6">
            This information will be displayed publicly so be careful what you
            share. Select the patient to access the exam.
          </p>
        </div>
      </div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <div className="flex flex-col items-start">
            <PatientTable
              setPatient={setPatient}
              openBackdropTable={openBackdropTable}
              setOpenBackdropTable={setOpenBackdropTable}
            />
            <h3 className="text-lg font-medium leading-6 text-gray-900 mt-2">
              Paciente: {patient.fullName}
            </h3>
            <p className="text-sm text-gray-600">Paciente ID: {patient._id}</p>
          </div>
        </div>

        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            onClick={() => setOpenBackdropTable(true)}
            className="mt-2 mr-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Selecionar paciente
          </button>
          <button
            className={`py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
              patient._id
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={() => setIsModalOpen(true)}
            disabled={!patient._id}
          >
            Abrir Exame
          </button>
        </div>
      </div>
      <ExamModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ExamsForm userId={patient._id} />
      </ExamModal>
    </div>
  );
}

export default AdminExams;
