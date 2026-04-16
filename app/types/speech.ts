/**
 * Web Speech API の型定義
 */

interface SpeechRecognitionEvent extends Event {
	resultIndex: number;
	results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
	length: number;
	item(index: number): SpeechRecognitionResult;
	[index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
	length: number;
	item(index: number): SpeechRecognitionAlternative;
	[index: number]: SpeechRecognitionAlternative;
	isFinal: boolean;
}

interface SpeechRecognitionAlternative {
	transcript: string;
	confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
	error: SpeechRecognitionErrorCode;
}

type SpeechRecognitionErrorCode
	= | 'no-speech'
		| 'audio-capture'
		| 'network'
		| 'network-timeout'
		| 'permission-denied'
		| 'service-not-allowed'
		| 'bad-grammar'
		| 'service-unavailable';

interface SpeechRecognition extends EventTarget {
	continuous: boolean;
	interimResults: boolean;
	lang: string;
	maxAlternatives: number;
	serviceURI: string;
	abort(): void;
	start(): void;
	stop(): void;
	onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
	onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
	onend: ((this: SpeechRecognition, ev: Event) => void) | null;
	onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
}

interface SpeechRecognitionConstructor {
	new (): SpeechRecognition;
}

declare global {
	interface Window {
		SpeechRecognition: SpeechRecognitionConstructor;
		webkitSpeechRecognition: SpeechRecognitionConstructor;
	}
}

export type { SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionErrorEvent };
