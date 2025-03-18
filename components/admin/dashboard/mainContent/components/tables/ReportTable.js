import React from 'react';
import { useCookies } from 'react-cookie';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { prevlabAxiosInstace } from '../../../../../../services/prevlabAxios';
import MaterialTable from 'material-table';
import { tableIcons } from '../../../../../iconsTable';
import Feedback from '../../../../../FeedBack';
import { JSPDF } from '../../../../../../services/jsPDF';
import { format } from 'date-fns';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

function ReportTable() {
  const classes = useStyles();
  const [cookies] = useCookies();
  const [patients, setPatients] = React.useState([]);
  const [update, setUpdate] = React.useState(false);
  const [feedback, setFeedback] = React.useState({
    open: false,
    type: 'success',
    msg: 'feedback'
  });

  const getPatients = async () => {
    const { userInfo } = cookies;
    const response = await prevlabAxiosInstace.patients._getPatients(userInfo);
    if (response.data === null || !response.data) {
      return;
    }
    if (response.data.error) {
      return setFeedback({
        open: true,
        type: 'error',
        msg: response.data.msg
      });
    }

    setPatients(response.data);
    return { data: response.data };
  };

  const allowExam = async patient => {
    const { userInfo } = cookies;
    try {
      const formattedDate = patient.allowedDate
        ? ''
        : format(new Date(), 'yyyy-MM-dd HH:mm:ss');

      const response = await prevlabAxiosInstace.patients._putPatient(
        userInfo,
        {
          _id: patient._id,
          allowedDate: formattedDate
        }
      );
      if (response.data.error) {
        return setFeedback({
          open: true,
          type: 'error',
          msg: response.data.msg
        });
      }
      setUpdate(!update);
      setFeedback({
        open: true,
        type: 'success',
        msg: response.data.msg
      });
    } catch (error) {
      console.log(error);
    }
  };

  const printLaudo = async patient => {
    const { userInfo } = cookies;
    const { _id } = patient;

    const examResponse = await prevlabAxiosInstace.exams._getExam(
      userInfo,
      _id
    );

    return await JSPDF.gerarDocNew(patient, examResponse.data);
  };

  React.useEffect(() => {
    getPatients();
  }, [update]);

  return (
    <Container maxWidth="lg">
      <Feedback obj={feedback} close={setFeedback} />
      <MaterialTable
        title="Relatórios"
        icons={tableIcons}
        columns={[
          {
            title: 'Nome',
            field: 'fullName'
          },

          {
            title: 'Solicitante',
            field: 'solicitante'
          },
          {
            title: 'Convênio',
            field: 'convenio'
          },
          {
            title: 'Liberado em',
            field: 'allowedDate',
            render: rowData =>
              rowData.allowedDate
                ? format(new Date(rowData.allowedDate), 'dd/MM/yyyy HH:mm:ss')
                : ''
          }
        ]}
        data={patients}
        actions={[
          {
            icon: tableIcons.LockOpen,
            tooltip: 'Liberar exame',
            onClick: (event, rowData) => allowExam(rowData)
          },
          rowData => ({
            icon: tableIcons.Print,
            tooltip: 'Imprimir',
            onClick: (event, rowData) => printLaudo(rowData)
          })
        ]}
        options={{
          actionsColumnIndex: -1
        }}
      />
    </Container>
  );
}

export default ReportTable;
