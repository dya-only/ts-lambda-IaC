resource "aws_apigatewayv2_api" "api_gateway" {
  name = "sls-lambda-gw"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "api_gateway" {
  api_id = aws_apigatewayv2_api.api_gateway.id

  name = "sls-lambda-stage"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.cloud_watch.arn

    format = jsonencode({
      requestId = "$context.requestId"
      sourceIp = "$context.identity.sourceIp"
      requestTime = "$context.requestTime"
      protocol = "$context.protocol"
      httpMethod = "$context.httpMethod"
      resourcePath = "$context.resourcePath"
      routeKey = "$context.routeKey"
      status = "$context.status"
      responseLength = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
    })
  }
}

# [GET] /hello
resource "aws_apigatewayv2_integration" "hello" {
  api_id = aws_apigatewayv2_api.api_gateway.id

  integration_uri = aws_lambda_function.hello.invoke_arn
  integration_type = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "hello" {
  api_id = aws_apigatewayv2_api.api_gateway.id

  route_key = "GET /hello"
  target = "integrations/${aws_apigatewayv2_integration.hello.id}"
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.hello.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.api_gateway.execution_arn}/*/*"
}

# [POST] /users
resource "aws_apigatewayv2_integration" "users_create" {
  api_id = aws_apigatewayv2_api.api_gateway.id

  integration_uri = aws_lambda_function.users_create.invoke_arn
  integration_type = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "users_create" {
  api_id = aws_apigatewayv2_api.api_gateway.id

  route_key = "POST /users"
  target = "integrations/${aws_apigatewayv2_integration.users_create.id}"
}

resource "aws_lambda_permission" "awi_gw" {
  statement_id = "AllowExecutionFromAPIGateway"
  action = "lambda:InvokeFunction"
  function_name = aws_lambda_function.users_create.function_name
  principal = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.api_gateway.execution_arn}/*/*"
}

# ---------------------

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.api_gateway.name}"

  retention_in_days = 30
}