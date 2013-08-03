package de.sveri.funcoding.comet

import net.liftweb.common.Loggable
import net.liftweb.http.{SHtml, CometActor}
import net.liftweb.http.js.JE.JsVar
import net.liftweb.http.js.JsCmds.{Script, Function}
import net.liftweb.json._
import net.liftweb.http.js.{JsCmds, JsCmd}

class AceComet extends CometActor with Loggable{

  def render = {
    "#callServerOnKeyUp" #> Script(Function("theUserTypedThis", List("e"), SHtml.jsonCall(JsVar("e"), updateOthers _ ).exp.cmd ))
  }

  private def updateOthers(j: JValue): JsCmd = {
    println("From the client we got: %s" format j )
    EditoServer ! EditorMessage(j)
    JsCmds.Noop
  }

}
