import React, { useState, useEffect, useRef } from 'react';
import '../style/PronunciationLesson.css';
import audioBufferToWav from 'audiobuffer-to-wav';

const PronunciationExercise = () => {
    const [wordList, setWordList] = useState([
        "apple", "banana", "computer"        
    ]);
    const [selectedWord, setSelectedWord] = useState('');
    const selectedWordRef = useRef('');
    const [isRecording, setIsRecording] = useState(false);
    const [score, setScore] = useState(null);
    const [error, setError] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const streamRef = useRef(null);

    useEffect(() => {
        let isMounted = true;
        setError(null);

        const initMicrophone = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        sampleRate: 44100
                    }
                });

                if (!isMounted) {
                    stream.getTracks().forEach(track => track.stop());
                    return;
                }

                streamRef.current = stream;
                const recorder = new MediaRecorder(stream);
                mediaRecorderRef.current = recorder;

                recorder.ondataavailable = (e) => {
                    audioChunksRef.current.push(e.data);
                };

                recorder.onstop = async () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                    audioChunksRef.current = [];
                
                    const arrayBuffer = await audioBlob.arrayBuffer();
                
                    const audioContext = new AudioContext({ sampleRate: 44100 });
                    const decodedAudio = await audioContext.decodeAudioData(arrayBuffer);
                
                    const wavBuffer = audioBufferToWav(decodedAudio); // converts to PCM WAV
                    const wavBlob = new Blob([new DataView(wavBuffer)], { type: 'audio/wav' });
                
                    await submitPronunciation(wavBlob, selectedWordRef.current);
                };
                
            } catch (err) {
                if (isMounted) {
                    console.error('Microphone error:', err);
                    setError('Microphone access denied. Please check permissions.');
                }
            }
        };

        if (navigator.mediaDevices?.getUserMedia) {
            initMicrophone();
        } else {
            setError('Your browser does not support audio recording');
        }

        return () => {
            isMounted = false;
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleRecordToggle = () => {
        setError(null);

        if (!selectedWord) {
            setError('Please select a word first.');
            return;
        }

        if (!isRecording) {
            audioChunksRef.current = [];
            setIsRecording(true);
            mediaRecorderRef.current.start(100);
        } else {
            setIsRecording(false);
            mediaRecorderRef.current.stop();
        }
    };

    const submitPronunciation = async (audioBlob, word) => {
        try {
            const formData = new FormData();
            const file = new File([audioBlob], "pronunciation.wav", { type: "audio/wav" });
            formData.append("AudioData", file); 
            formData.append("Word", word);
            console.log("Submitting word:", word);
    
            const response = await fetch("http://localhost:5000/api/Learning/Pronunciation", {
                method: "POST",
                body: formData,
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message, 'Server error');
            }
    
            const result = await response.json();
            setScore(result.score);
        } catch (err) {
            console.error('Error:', err);
            setError(err.message, 'Submission failed');
        }
    };

    return (
        <div className="test-container">
            <h2>Упражнение на произношение</h2>
            <p>Выберите слово и нажмите на кнопку записи</p>

            <div className="word-selection">
                <label>Выберите слово:</label>
                <select
                    value={selectedWord}
                    onChange={(e) => {
                        setSelectedWord(e.target.value);
                        selectedWordRef.current = e.target.value;
                        setScore(null);
                        setError(null);
                    }}
                >
                    <option value="">-- выберите слово --</option>
                    {wordList.map((word, index) => (
                        <option key={index} value={word}>{word}</option>
                    ))}
                </select>
            </div>

            {selectedWord && (
                <div className="recording-controls" style={{ marginTop: '15px' }}>
                    <button 
                        onClick={handleRecordToggle} 
                        disabled={!!error}
                        className="record-btn"
                    >
                        {isRecording ? 'Остановить и отправить' : 'Начать запись'}
                    </button>
                </div>
            )}

            {score !== null && (
                <div className="score-display" style={{ marginTop: '15px' }}>
                    <h3>Ваше произношение: {score}</h3>
                </div>
            )}

            {error && (
                <div className="error-message" style={{ marginTop: '15px', color: 'red' }}>
                    <p>Error: {error}</p>
                </div>
            )}
        </div>
    );
};

export default PronunciationExercise;
