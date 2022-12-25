import {useNavigate} from 'react-router-dom';


// export const useShowApplications = () => {
//   const navigate = useNavigate();
//   return () => navigate(applicationListPath());
// };

export const useCreateEntry = () => {
    const navigate = useNavigate();
    return (patientId: number) => navigate(`entry/${patientId}`);
};

