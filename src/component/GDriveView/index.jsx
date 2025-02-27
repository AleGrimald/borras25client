/* eslint-disable react/prop-types */
import './GDriveView.css'
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import ModalListaAlumnos from "../ModalListaAlumnos";

const GDriveView = (props) => {
    const {usuario} = props;
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [habilitarModal, setHabilitarModal] = useState(false);
    const [link, setLink] = useState();

    const updateSigninStatus = (isSignedIn) => {
        if (isSignedIn) {
        gapi.client.drive.files.list({
            q: "mimeType='application/pdf'",
        }).then(response => {
            setFiles(response.result.files);
        });
        } else {
        gapi.auth2.getAuthInstance().signIn();
        }
    };

    useEffect(() => {
        function start() {
        gapi.client.init({
            apiKey: 'AIzaSyA9Vrs2QzrIuemwqIfYpheiIsMPtgSqcE4',
            clientId: '202413920451-5p4c1h28vgq75554qnppflmh3kspsarr.apps.googleusercontent.com',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
            scope: 'https://www.googleapis.com/auth/drive.readonly',
        }).then(() => {
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
        }

        gapi.load('client:auth2', start);
    }, []);

    const handleViewFile = (file) => {
        setSelectedFile(`https://drive.google.com/file/d/${file.id}/preview`);
    };

    const asignarRutina= (file)=>{
        setHabilitarModal(true);
        setLink(`https://drive.google.com/file/d/${file.id}/preview`)
    }

    return (
        <div className='contenedor_gdrive'>
            <h2 className='gdrive_h2'>Archivos en Google Drive</h2>
            <button onClick={() => gapi.auth2.getAuthInstance().signOut()} className='btn-desconectar'>Desconectar</button>
            <table className='tabla-archivos'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acción</th>
                        <th>Asignacion</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map(file => (
                        <tr key={file.id}>
                            <td>{file.name}</td>
                            <td><button onClick={() => handleViewFile(file)} className='btn-accion'>Ver</button></td>
                            <td><button onClick={() => asignarRutina(file)} className='btn-accion'>Asignar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                habilitarModal?<ModalListaAlumnos 
                    usuario={usuario} 
                    setHabilitarModal={setHabilitarModal}
                    link={link}
                />:<></>
            }
            
            {
                selectedFile
                ?<div style={{ marginTop: '20px' }}>
                    <h2>Visor de PDF</h2>
                    <iframe src={selectedFile} width="100%" height="500px" title="Visor de PDF" sandbox="allow-scripts allow-same-origin"></iframe>
                </div>
                :<></>
            }
        </div>
    );
};

export default GDriveView;