package de.sveri.funcoding.comet

import net.liftweb._
import http._
import actor._
import net.liftweb.json.JsonAST.JValue


// register this class somehow with the url /editor/editor as a websocket/comet listener
object EditoServer extends LiftActor with ListenerManager {
  var history: String = ""

  override def lowPriority = {
    case EditorMessage(msg) => {
      history += msg //You have to modify this to do something useful with the JValue we got from the client
      updateListeners(msg)
    }
    case _ =>
  }

  def createUpdate = history
}

case class EditorMessage(message: JValue)
