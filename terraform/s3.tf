resource "random_pet" "lambda_bucket_name" {
  prefix = "lambda-bucket"
  length = 4
}

resource "aws_s3_bucket" "lambda_bucket" {
  bucket = random_pet.lambda_bucket_name.id
}

# lambda layer (node_modules)
data "archive_file" "lambda_layer" {
  type = "zip"

  source_dir = "../uuid"
  output_path = "../build/uuid.zip"
}

resource "aws_s3_object" "lambda_layer" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key = "nodejs.zip"
  source = data.archive_file.lambda_layer.output_path
  etag = filemd5(data.archive_file.lambda_layer.output_path)
}

# hello
data "archive_file" "lambda_hello" {
  type = "zip"

  source_file = "../dist/hello.js"
  output_path = "../build/hello.zip"
}

resource "aws_s3_object" "lambda_hello" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key = "hello.zip"
  source = data.archive_file.lambda_hello.output_path
  etag = filemd5(data.archive_file.lambda_hello.output_path)
}

# users create
data "archive_file" "lambda_users_create" {
  type = "zip"

  source_file = "../dist/users/create.js"
  output_path = "../build/users/create.zip"
}

resource "aws_s3_object" "lambda_users_create" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key = "create.zip"
  source = data.archive_file.lambda_users_create.output_path
  etag = filemd5(data.archive_file.lambda_users_create.output_path)
}