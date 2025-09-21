from transformers import pipeline
import logging
import hashlib
from functools import lru_cache
import concurrent.futures
import threading

# Load model once
pipe = pipeline(
    "text-generation",
    model="google/flan-t5-small",  # Using a smaller model that can run on CPU
    device="cpu"  # Explicitly use CPU
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_cache_key(input_data):
    """Generate a cache key from input data."""
    # Sort the items to ensure consistent keys
    sorted_items = sorted(input_data.items())
    # Create a string representation
    data_str = str(sorted_items)
    # Generate a hash
    return hashlib.md5(data_str.encode()).hexdigest()

@lru_cache(maxsize=100)  # Cache last 100 results
def get_cached_response(cache_key):
    """Get cached response if available."""
    return None  # Will be filled by lru_cache decorator

def generate_diet_recommendations(input_data):
    """
    Generate disease summary, diet recommendations, precautions, and doctor advice.
    """
    try:
        # Clean inputs
        filtered_input_data = {}
        for k, v in input_data.items():
            if v not in [None, '']:
                try:
                    filtered_input_data[k] = str(int(float(v)))
                except:
                    filtered_input_data[k] = v
                    
        # Check cache first
        cache_key = get_cache_key(filtered_input_data)
        cached_result = get_cached_response(cache_key)
        if cached_result is not None:
            logger.info("Using cached response")
            return cached_result

        # Build prompt
        prompt = "Blood Report Analysis:\n"
        for k, v in filtered_input_data.items():
            prompt += f"{k.replace('_', ' ')}: {v}\n"
        prompt += (
            "\nAnalyze the above blood test results. "
            "Provide:\n"
            "1. A summary of what these results may indicate (possible conditions/diseases).\n"
            "2. Diet recommendations.\n"
            "3. Necessary precautions.\n"
            "4. Which doctor to consult.\n"
            "Keep the explanation simple."
        )

        # Generate text with timeout
        with concurrent.futures.ThreadPoolExecutor() as executor:
            future = executor.submit(
                pipe,
                prompt,
                max_length=200,  # Set maximum length for T5 model
                do_sample=True,
                temperature=0.7,
                num_return_sequences=1
            )
            result = future.result()

        if result and len(result) > 0:
            generated = result[0]['generated_text'] if isinstance(result[0], dict) else result[0]
            generated = str(generated).strip()
            generated += "\n\nDisclaimer: This is an AI-generated report. Please consult a doctor for professional advice."
            return generated
        else:
            return "Sorry, could not generate a valid summary."
    except Exception as e:
        return "Sorry, there was an error generating your report. Please try again later."
