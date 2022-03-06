import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    'en': {
        
        'Match': 'Match',
        'Select Match': 'Select Match',
        'Coming Up': 'Coming Up',
        'Competition': 'Competition',
        'Open': 'Open',
        'General Filters': 'General Filters',
        'Odd Filters': 'Odd Filters',
        'Odds': 'Odds',
        'Total Live Stats': 'Total Live Stats',
        'Last 10 minutes Live Stats': 'Last 10 minutes Live Stats',
        'atk chart': 'atk chart',
        'Cancel': 'Cancel',
        'Select': 'Select',
        'Enter the Odd': 'Enter the Odd',
        'Enter the Stake': 'Enter the Stake',
        'pre-match Odd': 'pre-match Odd',
        'Responsability': 'Responsability',
        'Bookmaker': 'Bookmaker',
        'Correct Score': 'Correct Score',
        'Enter CS Odd': 'Enter CS Odd',
        'Enter CS Stake': 'Enter CS Stake',
        'Stake to cover': 'Stake to cover',
        'CS Odds': 'CS Odds',
        'Back': 'Back', 
        'Lay': 'Lay',
        'Total Matched': 'Total Matched',
        'Select Risk Trading': 'Select Risk Trading',
        'Easy': 'Easy',
        'Medium': 'Medium',
        'Risky': 'Risky',
        'Select Strategy': 'Select Strategy',
        'Alerts': 'Alerts',
        'Events': 'Events',
        'Odd': 'Odd',
        'Min': 'Min',
        'Score': 'Score',
        'Strategy': 'Strategy',
        'C': 'C',
        'Messages': 'Messages',
        'Cash out bar': 'Cash out bar',
        'Insert Odd and Stake': 'Insert Odd and Stake',
        'Max profit': 'Max profit',
        'Current Profit': 'Current Profit',
        'Correct Score bar': 'Correct Score bar',
        'Insert CS Odd and Stake': 'Insert CS Odd and Stake',
        'Equalization Bar': 'Equalization Bar',
        'cold stats': 'cold stats',
        'CLICK HERE TO LOAD COLD STATS': 'CLICK HERE TO LOAD COLD STATS',
        'team analysis': 'team analysis',
        'CLICK HERE TO LOAD TEAM ANALYSIS DATA.': 'CLICK HERE TO LOAD TEAM ANALYSIS DATA.'

    },

    'it': {
        'Match': 'Match',
        'Select Match': 'Seleziona Match',
        'Coming Up': 'in arrivo',
        'Competition': 'Competizione',
        'Open': 'Apri',
        'General Filters': 'Filtri Generali',
        'Odd Filters': 'Filtri quote',
        'Odds': 'Quote',
        'Total Live Stats': 'Statistiche Live Totali',
        'Last 10 minutes Live Stats': 'Statistiche ultimi 10 min.',
        'atk chart': 'atk chart',
        'Cancel': 'Cancella',
        'Select': 'Inserisci',
        'Enter the Odd': 'Inserisci quota',
        'Enter the Stake': 'Inserisci stake',
        'pre-match Odd': 'Quota prepartita',
        'Responsability': 'Responsabilità',
        'Bookmaker': 'Bookmaker',
        'Correct Score': 'Risultato Esatto',
        'Enter CS Odd': 'Inserisci quota RE',
        'Enter CS Stake': 'Inserisci stake RE',
        'Stake to cover': 'stake copertura',
        'CS Odds': 'Quota RE',
        'Back': 'Punta', 
        'Lay': 'Banca',
        'Total Matched': 'Totali Abbinate',
        'Select Risk Trading': 'Seleziona Rischio Trading',
        'Easy': 'Basso',
        'Medium': 'Medio',
        'Risky': 'Alto',
        'Select Strategy': 'Seleziona Strategia',
        'Alerts': 'Alerts',
        'Events': 'Eventi',
        'Odd': 'Quota',
        'Min': 'Min',
        'Score': 'Punteggio',
        'Strategy': 'Strategia',
        'C': 'C',
        'Messages': 'Messaggi',
        'Cash out bar': 'Barra Cash out',
        'Insert Odd and Stake': 'Inserire Quota e Stake',
        'Max profit': 'Profitto massimo',
        'Current Profit': 'Profitto attuale',
        'Correct Score bar': 'Barra Risultato Esatto',
        'Insert CS Odd and Stake': 'Inserire Quota e Stake RE',
        'Equalization Bar': 'Barra equalizzazione',
        'cold stats': 'Statistiche',
        'CLICK HERE TO LOAD COLD STATS': 'CLICCA QUA PER CARICARE LE STATISTICHE',
        'team analysis': 'Analisi Squadre',
        'CLICK HERE TO LOAD TEAM ANALYSIS DATA.': "CLICCA QUA PER CARICARE L'ANALISI SQUADRE."
    },

    'pt': {
        match_main: 'Match',
        select_match_main: 'Select Match',
        coming_up_main: 'Coming Up',
    },

    'es': {
        match_main: 'Match',
        select_match_main: 'Select Match',
        coming_up_main: 'Coming Up',
    },

    'fr': {
        match_main: 'Match',
        select_match_main: 'Select Match',
        coming_up_main: 'Coming Up',
    },

    'de': {
        match_main: 'Match',
        select_match_main: 'Select Match',
        coming_up_main: 'Coming Up',
    },

    'ru': {
        match_main: 'Match',
        select_match_main: 'Select Match',
        coming_up_main: 'Coming Up',
    },
};

const i18n = new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'es', // set fallback locale
    messages, // set locale messages
});

export default i18n;