import React from "react";
import { Container, Typography } from "@mui/material";

export const PrivacyPolicy = () => {
    return (
        <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom>
                Politica de Confidențialitate
            </Typography>
            <Typography variant="body1" paragraph>
                Această Politică de Confidențialitate descrie modul în care colectăm, utilizăm și protejăm informațiile dumneavoastră personale, în conformitate cu Regulamentul General privind Protecția Datelor (GDPR).
            </Typography>

            <Typography variant="h6" gutterBottom>
                1. Cine suntem?
            </Typography>
            <Typography variant="body1" paragraph>
                Noi, S.C. Vidican Food S.R.L., cu sediul în Arad, Strada Tribunul Dobra nr. 18, suntem responsabili pentru prelucrarea datelor dumneavoastră personale. Puteți să ne contactați la adelinaiancu@yahoo.com.
            </Typography>

            <Typography variant="h6" gutterBottom>
                2. Ce date colectăm?
            </Typography>
            <Typography variant="body1" paragraph>
                În timpul utilizării serviciilor noastre, putem colecta următoarele date personale:
            </Typography>
            <ul>
                <li>Nume și prenume</li>
                <li>Număr de telefon</li>
                <li>Adresa pentru livrare/comandă</li>
                <li>Comanda dumneavoastră</li>
            </ul>

            <Typography variant="h6" gutterBottom>
                3. Cum utilizăm datele colectate?
            </Typography>
            <Typography variant="body1" paragraph>
                Datele personale sunt utilizate exclusiv în scopuri legitime, cum ar fi:
            </Typography>
            <ul>
                <li>Procesarea comenzilor și livrarea acestora</li>
                <li>Contactarea dumneavoastră pentru actualizări sau întrebări legate de comenzi</li>
            </ul>

            <Typography variant="h6" gutterBottom>
                4. Care este temeiul legal pentru prelucrarea datelor?
            </Typography>
            <Typography variant="body1" paragraph>
                Prelucrarea datelor dumneavoastră se face pe baza următoarelor temeiuri legale:
            </Typography>
            <ul>
                <li>Executarea unui comenzi</li>
                <li>Obligații legale</li>
            </ul>

            <Typography variant="h6" gutterBottom>
                5. Cine are acces la datele dumneavoastră?
            </Typography>
            <Typography variant="body1" paragraph>
                Datele dumneavoastră sunt accesibile numai:
            </Typography>
            <ul>
                <li>Echipei noastre interne care gestionează comenzile</li>
                <li>Autorităților, dacă este necesar prin lege</li>
            </ul>

            <Typography variant="h6" gutterBottom>
                6. Cum protejăm datele dumneavoastră?
            </Typography>
            <Typography variant="body1" paragraph>
                Luăm măsuri tehnice și organizatorice adecvate pentru a proteja datele dumneavoastră împotriva accesului neautorizat, pierderii sau distrugerii. Utilizăm:
            </Typography>
            <ul>
                <li>Conexiuni securizate (SSL) pentru transmiterea datelor</li>
                <li>Acces restricționat la date</li>
            </ul>

            <Typography variant="h6" gutterBottom>
                7. Cât timp păstrăm datele?
            </Typography>
            <Typography variant="body1" paragraph>
                Datele personale vor fi păstrate:
            </Typography>
            <ul>
                <li>Pe durata necesară procesării comenzilor</li>
            </ul>

            <Typography variant="h6" gutterBottom>
                8. Care sunt drepturile dumneavoastră?
            </Typography>
            <Typography variant="body1" paragraph>
                Conform GDPR, aveți următoarele drepturi:
            </Typography>
            <ul>
                <li>Dreptul de acces la datele dumneavoastră personale</li>
                <li>Dreptul de rectificare a datelor inexacte</li>
                <li>Dreptul de ștergere („dreptul de a fi uitat”)</li>
                <li>Dreptul de restricționare a prelucrării</li>
                <li>Dreptul la portabilitatea datelor</li>
                <li>Dreptul de a vă opune prelucrării</li>
                <li>Dreptul de a depune plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</li>
            </ul>
            <Typography variant="body1" paragraph>
                Pentru a vă exercita drepturile, ne puteți contacta la [email/contact telefonic].
            </Typography>

            <Typography variant="h6" gutterBottom>
                9. Modificări ale politicii de confidențialitate
            </Typography>
            <Typography variant="body1" paragraph>
                Ne rezervăm dreptul de a actualiza această politică. Orice modificare va fi publicată pe această pagină.
            </Typography>

            <Typography variant="h6" gutterBottom>
                10. Contact
            </Typography>
            <Typography variant="body1" paragraph>
                Pentru întrebări sau cereri legate de datele dumneavoastră personale, ne puteți contacta la:
            </Typography>
            <Typography variant="body1">
                Email: adelinaiancu@yahoo.com <br />
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 4 }}>
                Această Politică de Confidențialitate a fost actualizată ultima dată la 30/11/2024.
            </Typography>
        </Container>
    );
};

export default PrivacyPolicy;
