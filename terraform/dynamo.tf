# users table
resource "aws_dynamodb_table" "dynamo" {
  name = "DynamoUsers"
  billing_mode = "PROVISIONED"
  hash_key = "username"
  read_capacity  = 10
  write_capacity = 10

  attribute {
    name = "username"
    type = "S"
  }
}