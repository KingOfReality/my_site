import openai

# Set up your OpenAI API credentials
openai.api_key = "YOUR_API_KEY"


# Define a function to generate a response
def generate_response(user_input):
    # Create the prompt by appending the user's input
    prompt = "User: " + user_input + "\nAI:"

    # Generate a response from the AI model
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=50,
        n=1,
        stop=None,
        temperature=0.7,
    )

    # Extract the generated response from the API response
    generated_text = response.choices[0].text.strip()

    # Return the generated response
    return generated_text


# Prompt the user for input
user_input = input("Enter a command: ")

# Generate a response using NLP
response = generate_response(user_input)

# Print the response
print(response)
