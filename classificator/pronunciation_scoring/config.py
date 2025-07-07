from pathlib import Path

SAMPLE_RATE = 16_000
MAX_LEN     = 100
N_MFCC      = 13
BATCH_SIZE  = 8
EPOCHS      = 100

DATA_DIR   = Path("DatasetAudio")
MODELS_DIR = Path("models")

MODELS_DIR.mkdir(exist_ok=True)
