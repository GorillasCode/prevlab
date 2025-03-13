import React from 'react';
import { useCookies } from 'react-cookie';
import PatientTable from './tables/PatientsTable';
import { prevlabAxiosInstace } from '../../../../../services/prevlabAxios';
import LoadingBackdrop from '../../../../LoadingBackdrop';
import FeedBack from '../../../../FeedBack';
function PacientForm() {
  const [cookies] = useCookies();
  const [loading, setLoading] = React.useState(false);
  const [openBackdropTable, setOpenBackdropTable] = React.useState(false);
  const [convenio, setConvenios] = React.useState([]);
  const [patient, setPatient] = React.useState({
    fullName: '',
    age: 0,
    solicitante: '',
    convenio: '',
    bornDate: ''
  });
  const [feedback, setFeedback] = React.useState({
    open: false,
    type: 'success',
    msg: 'feedback'
  });

  const resetFields = () => {
    setPatient({
      fullName: '',
      age: 0,
      solicitante: '',
      convenio: '',
      bornDate: ''
    });
    return;
  };

  const getConvenios = async () => {
    const { userInfo } = cookies;
    const response = await prevlabAxiosInstace.labs._getLabs(userInfo);
    if (!response.data) {
      return;
    }
    let convenios = response.data.map(el => el.convenio);
    setConvenios(convenios);
  };

  const savePatient = async () => {
    if (!patient.fullName || !patient.convenio) {
      return;
    }
    setLoading(true);
    const { userInfo } = cookies;
    const { _id } = patient;
    const response = await prevlabAxiosInstace.patients[
      _id ? '_putPatient' : '_postPatient'
    ](userInfo, patient);
    resetFields();
    setLoading(false);
    if (response.data.error) {
      setFeedback({
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
  };
  const deletePatient = async () => {
    setLoading(true);
    const { userInfo } = cookies;
    const { _id } = patient;
    const response = await prevlabAxiosInstace.patients._deletePatient(
      userInfo,
      _id
    );
    resetFields();
    setLoading(false);
    if (response.data.error) {
      setFeedback({
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
  };

  React.useEffect(() => {
    getConvenios();
  }, []);

  return (
    <>
      <FeedBack obj={feedback} close={setFeedback} />
      <LoadingBackdrop openClose={loading} />
      <PatientTable
        setPatient={setPatient}
        openBackdropTable={openBackdropTable}
        setOpenBackdropTable={setOpenBackdropTable}
      />
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Cadastro de Pacientes
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6"></div>
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company_website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {'Nome completo*'}
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm ">
                      <input
                        type="text"
                        name={`company_nomeCompleto`}
                        id={`company_nomeCompleto`}
                        onChange={evt =>
                          setPatient({
                            ...patient,
                            fullName: evt.target.value
                          })
                        }
                        value={patient.fullName}
                        className="border border-gray-500 p-2 flex-1 block w-full h-10  rounded-r-md sm:text-sm  "
                        placeholder="..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="grid grid-cols-auto">
                      <label
                        htmlFor="company_website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Idade
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm ">
                        <input
                          type="number"
                          name={`company_idade`}
                          id={`company_idade`}
                          value={patient.age}
                          onChange={evt =>
                            setPatient({ ...patient, age: evt.target.value })
                          }
                          className="border border-gray-500 p-2 flex-1 block w-full h-10  rounded-r-md sm:text-sm "
                          placeholder="..."
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-auto">
                      <label
                        htmlFor="company_website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Data de Nascimento
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm ">
                        <input
                          type="date"
                          name={`company_date`}
                          id={`company_date`}
                          value={
                            patient.bornDate
                              ? patient.bornDate.split('T')[0]
                              : patient.bornDate
                          }
                          onChange={evt => {
                            const currentDate = new Date();
                            const age =
                              currentDate.getFullYear() -
                              new Date(evt.target.value).getFullYear();
                            setPatient({
                              ...patient,
                              bornDate: evt.target.value,
                              age
                            });
                          }}
                          className="border border-gray-500 p-2 flex-1 block w-full h-10  rounded-r-md sm:text-sm  "
                          placeholder="..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company_website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {'Solicitante'}
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm ">
                      <input
                        type="text"
                        name={`company_solicitante`}
                        id={`company_solicitante`}
                        onChange={evt =>
                          setPatient({
                            ...patient,
                            solicitante: evt.target.value
                          })
                        }
                        value={patient.solicitante}
                        className="border border-gray-500 p-2 flex-1 block w-full h-10  rounded-r-md sm:text-sm  "
                        placeholder="..."
                      />
                    </div>
                  </div>
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company_website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {'Convênio*'}
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm ">
                      <select
                        type={''}
                        name={`company_convenio`}
                        id={`company_convenio`}
                        onChange={evt =>
                          setPatient({
                            ...patient,
                            convenio: evt.target.value
                          })
                        }
                        value={patient.convenio}
                        className="border border-gray-500 p-2 flex-1 block w-full h-10  rounded-r-md sm:text-sm  "
                        placeholder="..."
                      >
                        <option value="PARTICULAR">PARTICULAR</option>
                        {convenio.map(el => (
                          <option
                            key={el + Math.random().toString()}
                            value={el}
                          >{`${el}`}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              {patient._id ? (
                <button
                  onClick={deletePatient}
                  className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-red-600 hover:text-white bg-white border-red-500 hover:border-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Deletar
                </button>
              ) : null}
              {!patient.fullName ? (
                <button
                  onClick={() => setOpenBackdropTable(true)}
                  className="inline-flex justify-center py-2 px-4 mr-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Editar paciente
                </button>
              ) : null}
              <button
                onClick={resetFields}
                className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-green-600 hover:text-white bg-white border-green-500 hover:border-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Resetar
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={savePatient}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
}

export default PacientForm;
