from __future__ import annotations
import numpy as np
import librosa

from . import config

def augment(y: np.ndarray, sr: int) -> np.ndarray:
    y_aug = librosa.effects.time_stretch(y, rate=np.random.uniform(0.9, 1.1))
    y_aug = librosa.effects.pitch_shift(y=y_aug, sr=sr,
                                        n_steps=np.random.uniform(-1, 1))
    noise = 0.003 * np.random.randn(len(y_aug))
    return y_aug + noise


def extract_features(file_path: str | bytes | "os.PathLike",
                     *,
                     do_aug: bool = False) -> np.ndarray:
    y, sr = librosa.load(file_path, sr=config.SAMPLE_RATE)

    if do_aug:
        y = augment(y, sr)

    mfcc = librosa.feature.mfcc(y=y,
                                sr=sr,
                                n_mfcc=config.N_MFCC)

    if mfcc.shape[1] < config.MAX_LEN:
        pad = config.MAX_LEN - mfcc.shape[1]
        mfcc = np.pad(mfcc, ((0, 0), (0, pad)), mode="constant")
    else:
        mfcc = mfcc[:, :config.MAX_LEN]

    return mfcc.T
