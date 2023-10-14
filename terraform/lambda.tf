resource "aws_lambda_function" "hello" {
  function_name = "hello"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key = aws_s3_object.lambda_hello.key

  runtime = "nodejs18.x"
  handler = "hello.handler"

  role = aws_iam_role.lambda_iam.arn
}

resource "aws_cloudwatch_log_group" "cloud_watch" {
  name = "/aws/lambda/${aws_lambda_function.hello.function_name}"
  retention_in_days = 30
}