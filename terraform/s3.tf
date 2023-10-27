resource "random_pet" "lambda_bucket_name" {
  prefix = "lambda-bucket"
  length = 4
}

resource "aws_s3_bucket" "lambda_bucket" {
  bucket = random_pet.lambda_bucket_name.id
}

# lambda layers
data "archive_file" "jsonwebtoken" {
  type = "zip"

  source_dir = "../layers/jsonwebtoken"
  output_path = "../build/layers/jsonwebtoken.zip"
}

resource "aws_s3_object" "jsonwebtoken" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key = "jsonwebtoken.zip"
  source = data.archive_file.jsonwebtoken.output_path
  etag = filemd5(data.archive_file.jsonwebtoken.output_path)
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

# users findAll
data "archive_file" "lambda_users_find_all" {
  type = "zip"

  source_file = "../dist/users/findAll.js"
  output_path = "../build/users/findAll.zip"
}

resource "aws_s3_object" "lambda_users_find_all" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key = "findAll.zip"
  source = data.archive_file.lambda_users_find_all.output_path
  etag = filemd5(data.archive_file.lambda_users_find_all.output_path)
}

# users find one
data "archive_file" "lambda_users_find_by_id" {
  type = "zip"

  source_file = "../dist/users/findOne.js"
  output_path = "../build/users/findOne.zip"
}

resource "aws_s3_object" "lambda_users_find_by_id" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key = "findById.zip"
  source = data.archive_file.lambda_users_find_by_id.output_path
  etag = filemd5(data.archive_file.lambda_users_find_by_id.output_path)
}

# auth by-pass
data "archive_file" "lambda_auth_by_pass" {
  type = "zip"

  source_file = "../dist/auth/by-pass.js"
  output_path = "../build/auth/by-pass.zip"
}

resource "aws_s3_object" "lambda_auth_by_pass" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key = "by-pass.zip"
  source = data.archive_file.lambda_auth_by_pass.output_path
  etag = filemd5(data.archive_file.lambda_auth_by_pass.output_path)
}

# auth verify
data "archive_file" "lambda_auth_verify" {
  type = "zip"

  source_file = "../dist/auth/verify.js"
  output_path = "../build/auth/verify.zip"
}

resource "aws_s3_object" "lambda_auth_verify" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key = "verify.zip"
  source = data.archive_file.lambda_auth_verify.output_path
  etag = filemd5(data.archive_file.lambda_auth_verify.output_path)
}