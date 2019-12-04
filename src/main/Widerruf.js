import React, { Component } from 'react';

export default class Widerruf extends Component {
    render() {
        return (
            <div className="container">
            <div className="termctn">
                <p className="legal language">
                    <a className="linkcolor" href="withdraw">You can find the English version here</a>
                </p>
                <p className="header">
                    Widerrufsbelehrung (Nur Staatsangehörige von EU Ländern)
                </p>
                <p id="english" className="header">
                    Widerrufsrecht
                </p>
                <p id="english" className="legal">
                    Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. 
                Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses. 
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Köthe und Sentürk GbR, Edewechter Landstraße 70, 26131 Oldenburg, Tel: TODO, E-Mail: info(at)richlist.net) mittels einer eindeutigen Erklärung (z. B.per E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. 
                Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. 
                Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden. 

                </p>
                <p id="english" className="header">
                    Folgen des Widerrufs 

                </p>
                <p id="english" className="legal">
                    Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. 
                    Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet. 
                </p>


            <p id="english" className="header">
                    Muster-Widerrufsformular
            </p> 
            <p id="english" className="legal">      
                 
                (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.) <br /><br />

                An: info(at)richlist.net<br />
                Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung:<br />
                Bestellt am (*)/erhalten am (*):<br />
                Name des/der Verbraucher(s):<br />
                Anschrift des/der Verbraucher(s): <br />
                Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier) :<br />
                Datum:<br /><br />

                (*) Unzutreffendes streichen         
            </p>
            <p id="english" className="header">                
                Hinweise zum Erlöschen des Widerrufsrechts
            </p>
            <p id="english" className="legal">                
                In folgenden Fällen besteht die Möglichkeit eines Erlöschens des gesetzlichen Widerrufsrechts: 
            </p>
            <p id="english" className="legal">                

                Gemäß § 356 Abs. 4 BGB bei Verträgen zur Erbringung von Dienstleistungen, wenn der Unternehmer die Dienstleistung vollständig erbracht hat und mit der Ausführung der Dienstleistung erst begonnen hat, nachdem der Verbraucher dazu seine ausdrückliche Zustimmung gegeben hat und gleichzeitig seine Kenntnis davon bestätigt hat, dass er sein Widerrufsrecht bei vollständiger Vertragserfüllung durch den Unternehmer verliert. 
            </p>
            <p id="english" className="legal">                

                Gemäß § 356 Abs. 5 BGB bei Verträgen über die Lieferung von nicht auf einem körperlichen Datenträger befindlichen digitalen Inhalten, wenn der Unternehmer mit der Ausführung des Vertrages begonnen hat, nachdem der Verbraucher ausdrücklich zugestimmt hat, dass der Unternehmer mit der Ausführung des Vertrages vor Ablauf der Widerrufsfrist beginnt, und der Verbraucher seine Kenntnis davon bestätigt hat, dass er durch die Zustimmung mit Beginn der Ausführung des Vertrages sein Widerrufsrecht verliert. In diesen Fällen erlischt das dem Verbraucher (i.S.v. § 13 BGB) zunächst zustehende gesetzliche Widerrufsrecht.
            </p>
            </div>
            </div>
        );
    }
}