import React from 'react';

import PatientTable from './components/tables//PatientsTable';
import { useCookies } from 'react-cookie';

import { prevlabAxiosInstace } from '../../../../services/prevlabAxios';
import ExamsForm from './components/ExamsForm';
import ExamModal from './components/ExamModal';
import { useState, useEffect } from 'react';

function AdminExams() {
  const [cookies] = useCookies();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openBackdropTable, setOpenBackdropTable] = React.useState(false);
  const [patient, setPatient] = React.useState({
    fullName: '',
    _id: ''
  });
  const [exam, setExam] = React.useState({
    pacient_id: '',
    collectDate: '',
    avaliacaoDaAmostra: '',
    celulaNaoEpiteliais: '',
    descamacaoDominante: '',
    alteracoesCelulares: '',
    celulasMetaplasicas: '',
    celulasEndocervicais: '',
    celulasEndometriais: '',
    floraVaginal: '',
    agentesEspecificos: '',
    citolise: '',
    conclusao: '',
    observacoes: ''
  });
  const saveExam = async () => {
    setLoading(true);
    const { userInfo } = cookies;
    if (!patient._id || !exam.conclusao || !exam.collectDate) {
      return;
    }
    const response = await prevlabAxiosInstace.exams._postExam(userInfo, exam);
    if (response.data.error) {
      setLoading(false);
      return setFeedback({
        open: true,
        type: 'error',
        msg: response.data.msg
      });
    }
    setFeedback({
      open: true,
      type: 'success',
      msg: response.data.msg
    });
    resetFields();
    setLoading(false);
  };

  const checkExam = async () => {
    const { userInfo } = cookies;
    if (patient._id === '') {
      return;
    }
    const response = await prevlabAxiosInstace.exams._getExam(
      userInfo,
      patient._id
    );
    console.log(response.data);
    if (response.data === null || !response.data) {
      return setExam({ ...exam, patient_id: patient._id });
    }
    setExam({ ...response.data });
  };
  React.useEffect(() => {
    checkExam();
  }, [patient._id]);
  return (
    <div className="flex">
      <div className="flex-grow">
        <div className="container">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <div className="flex flex-row justify-between  px-4 py-3 bg-gray-50 text-right sm:px-6">
                <div className="flex-col">
                  <PatientTable
                    setPatient={setPatient}
                    openBackdropTable={openBackdropTable}
                    setOpenBackdropTable={setOpenBackdropTable}
                  />
                  <h3 className=" flex text-lg self-start font-medium leading-6 text-gray-900">
                    Paciente: {patient.fullName}
                  </h3>
                  <p className="flex self-start mt-1 text-sm text-gray-600">
                    Paciente ID: {patient._id}
                  </p>
                </div>
                <div className="flex-col">
                  {!patient._id ? (
                    <button
                      onClick={() => setOpenBackdropTable(true)}
                      className="inline-flex justify-center  py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Selecionar paciente
                    </button>
                  ) : null}
                </div>
              </div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Cadastro de Exames
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <button
            className="inline-flex justify-center  py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => setIsModalOpen(true)}
          >
            Novo Exame
          </button>
          <ExamModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ExamsForm />
          </ExamModal>
        </div>
      </div>
    </div>
  );
}

export default AdminExams;
